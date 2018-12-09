import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),

  didUpdateAttrs() {
    this._super(...arguments);
    let resultId = this.get('resultId');
    // poll the api ever x seconds to get the result
    if (resultId) {
      let result = this.store.findRecord('result', resultId);
      console.log(result);
      this.set('error', result.error);
      this.set('output', result.output);
    }
  }
});
