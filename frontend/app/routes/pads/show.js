import Route from '@ember/routing/route';

export default Route.extend({
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
