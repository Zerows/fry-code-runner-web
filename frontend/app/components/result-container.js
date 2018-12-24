import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  error: null,
  output: null,
  didUpdateAttrs() {
    this._super(...arguments);
    let result = this.get('result');
    let poll = setInterval(() => {
      result.reload().then((model) => {
        if (model.htmlOutput !== null || model.error !== null) {
          clearInterval(poll);
          this.removeLoader()
        }
      })
    }, 3000);
  }
});
