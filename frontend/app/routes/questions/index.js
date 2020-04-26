import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('question');
  },
  setupController(conrtoller, model) {
    conrtoller.set('model', model)
  },
  actions: {
    async createQuestionAction(language) {
      this.controller.set('showLoading', true)
      let newRecord = this.store.createRecord('question', {
        language: language
      });
      try {
        let record = await newRecord.save()
        this.controller.set('showLoading', false)
        this.transitionTo('questions.show', record.slug)
      } catch (e) {
        newRecord.unloadRecord()
        this.controller.set('showLoading', false)
      }
    },

    async deleteQuestionAction(question) {
      try {
        this.controller.set('showLoading', true)
        await question.destroyRecord();
        this.controller.set('showLoading', false)
      } catch (error) {
        this.controller.set('showLoading', false)
      }

    }
  }
});
