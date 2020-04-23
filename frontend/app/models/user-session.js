import Model from '@ember-data/model';

export default Model.extend({
  authenticate(options) {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.authenticate(options);
  },

  authenticateGuest(options) {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.authenticateGuest(options);
  }
});
