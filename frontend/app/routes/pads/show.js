import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
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
