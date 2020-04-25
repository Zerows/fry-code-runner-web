import Route from '@ember/routing/route';
import GuestAuthenticatedRouteMixinMixin from 'frontend/mixins/guest-authenticated-route-mixin';
import Poller from 'frontend/utils/poller'
import {inject as service} from '@ember/service';
import {run} from '@ember/runloop'

export default Route.extend(GuestAuthenticatedRouteMixinMixin, {
  poller: Poller.create(),
  websockets: service('socket-io'),
  session: service('user-session'),
  canPublish: true,
  model(params) {
    return this.store.findRecord('pad', params.pad_id);
  },
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('result', null);
    controller.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
    const socket = this.websockets.socketFor(this.session.socketUrl(), {
      query: {
        room: model.slug
      }
    });
    this.set('socket', socket);
    socket.on('event', (message) => {
      var deltas = [];
      deltas[0] = message;
      run(() => {
        this.set('canPublish', false);
        this.controller.setDelta(deltas);
        this.set('canPublish', true);
      });
    });
  },
  actions: {
    onEdit(event) {
      run(() => {
        if (this.canPublish) {
          this.socket.emit('event', event);
        }
      })
    },
    fetchQuestions() {
      this.controller.set('questions', this.store.findAll('question'));
    },
    async submitPadAction(pad) {
      try {
        let tempResult = this.store.createRecord('result', {
          status: 'in_queue'
        });
        this.controller.set('result', tempResult);
        let result = await pad.submit()
        tempResult.unloadRecord();
        this.controller.set('result', null);
        this.poll(result)
      } catch (error) {
        this.controller.set('result', null);
      }
    },
    async savePad(pad) {
      this.controller.set('saving', true);
      try {
        await pad.save()
        this.controller.set('saving', false);
      } catch (error) {
        this.controller.set('saving', false);
      }
    },
  },
  async poll(currentResult) {
    this.poller.startPoll(async () => {
      this.controller.set('polling', true)
      let newResult = await currentResult.reload()
      let canPoll = newResult.status == 'in_queue' || newResult.status == 'in_progress';
      this.controller.set('result', newResult);
      this.controller.set('polling', canPoll)
      return !canPoll
    }, () => {
      let result = this.controller.result
      this.controller.set('polling', false)
      result.set('status', 'cancelled');
    })
  },
  deactivate() {
    this.websockets.closeSocketFor(this.socketUrl);
  }

});
