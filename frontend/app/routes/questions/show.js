import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Poller from '../../utils/poller';
import {inject as service} from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  poller: Poller.create(),
  session: service('user-session'),
  model(params) {
    return this.store.findRecord('question', params.question_id);
  },
  setupController(controller, model) {
    controller.set('model', model);
    controller.set('result', null);

    controller.set('difficulty', ['easy', 'medium', 'hard'])
  },
  actions: {
        async saveQuestionAction(question) {
            try {
                this.controller.set('saving', true);
                await question.save()
                this.controller.set('saving', false);
            } catch (error) {
                this.controller.set('saving', false);
            }
        },
        async dryRunAction(question) {
            try {
                this.controller.set('saving', true);
                let tempResult = this.store.createRecord('result', {
                    status: 'in_queue'
                });
                this.controller.set('result', tempResult);
                let result = await question.dryRun()
                tempResult.unloadRecord();
                this.controller.set('saving', false);
                this.controller.set('result', null);
                this.poll(result)
            } catch (error) {
                this.controller.set('saving', false);
            }
        }
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
