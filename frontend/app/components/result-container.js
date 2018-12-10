import Component from '@ember/component';

export default Component.extend({
  store: Ember.inject.service(),
  error: null,
  output: null,
  didUpdateAttrs() {
    this._super(...arguments);
    let resultId = this.get('resultId');
    // poll the api ever x seconds to get the result

      let poll = setInterval(() => {
        let result = this.store.findRecord('result', resultId);
        if(this.get('output') !== null || this.get('error') !== null) {
          this.set('error', result.error);
          this.set('output', result.output);
          this.sendAction('removeLoader');
          poll.clearInterval;
        }
      }, 500);

  }
});
