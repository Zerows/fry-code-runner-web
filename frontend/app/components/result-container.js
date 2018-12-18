import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  error: null,
  output: null,
  didUpdateAttrs() {
    this._super(...arguments);
    let resultId = this.get('resultId');
    // poll the api ever x seconds to get the result

      let poll = setInterval(() => {
        let result = this.store.findRecord('result', resultId);
        result.then((data) => {
          if(data.output !== null || data.error !== null) {
            this.set('error', data.error);
            this.set('output', data.output);
            clearInterval(poll);
            this.removeLoader()
          }
        })
      }, 500);

  }
});
