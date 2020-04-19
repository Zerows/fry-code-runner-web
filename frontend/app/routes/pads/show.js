import Route from '@ember/routing/route';
import GuestAuthenticatedRouteMixinMixin from 'frontend/mixins/guest-authenticated-route-mixin';
import Poller from 'frontend/utils/poller'

export default Route.extend(GuestAuthenticatedRouteMixinMixin, {
  poller: Poller.create(),
  model(params) {
    return this.store.findRecord('pad', params.pad_id);
  },
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('result', null);
    controller.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
  },
  actions: {
    async fetchQuestions() {
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
        console.log(error)
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
  }
});
