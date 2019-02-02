import Route from '@ember/routing/route';
import GuestAuthenticatedRouteMixinMixin from 'frontend/mixins/guest-authenticated-route-mixin';

export default Route.extend(GuestAuthenticatedRouteMixinMixin, {
  model(params) {
    return this.store.findRecord('pad', params.pad_id);
  },
  setupController(controller,model){
    controller.set('model', model);
  },
  actions: {
    fetchQuestions(controller){
      controller.set('questions', this.store.findAll('question'));
    }
  }
});
