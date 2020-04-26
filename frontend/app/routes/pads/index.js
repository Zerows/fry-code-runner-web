import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';


export default Route.extend(AuthenticatedRouteMixin, {

  model() {
    return this.store.findAll('pad');
  },
  setupController(controller, model) {
    controller.set('model', model)
    controller.set('errors', null)
    controller.set('loading', false)
  },

  actions: {
    async createPadAction(language) {
      let newRecord = this.store.createRecord('pad', {
        language: language
      });
      try {
        this.controller.set('loading', true)
        let record = await newRecord.save()
        this.controller.set('loading', false)
        this.transitionTo('pads.show', record.slug)
      } catch (error) {
        newRecord.unloadRecord();
        this.controller.set('loading', false)
        this.controller.set('errors', error.errors)
      }

    },
    destroyPadAction(pad) {
      pad.destroyRecord();
    }
  }
});
