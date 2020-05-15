import Route from '@ember/routing/route';
import GuestAuthenticatedRouteMixinMixin from 'frontend/mixins/guest-authenticated-route-mixin';


export default Route.extend(GuestAuthenticatedRouteMixinMixin, {

  model() {
    return this.store.findAll('question');
  },
  setupController(conrtoller, model) {
    conrtoller.set('model', model)
  },
  actions: {
    async createPadAction(question) {
      let newRecord = this.store.createRecord('pad', {
        language: question.language,
        content: question.content,
        info: question.description
      });
      try {
        let record = await newRecord.createGuestPad()
        this.controller.set('showLoading', false)
        this.transitionTo('pads.show', record.slug)
      } catch (error) {
        newRecord.unloadRecord()
        this.controller.set('showLoading', false)
        this.controller.set('errors', error.errors)
      }
    },
    async createQuestionAction(language) {
      this.controller.set('showLoading', true)
      let newRecord = this.store.createRecord('question', {
        language: language
      });
      try {
        let record = await newRecord.save()
        this.controller.set('showLoading', false)
        this.transitionTo('questions.show', record.slug)
      } catch (error) {
        newRecord.unloadRecord()
        this.controller.set('showLoading', false)
        this.controller.set('errors', error.errors)
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
