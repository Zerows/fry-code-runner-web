import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({
  showLoader: false,
  init() {
    this._super(...arguments)
    this.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
  },
  showProgress: computed('result', function() {
    let result = this.get('result');
    let status = result != null ? result.get('status') : "";
    if(status.length == 0
      || status == 'in_queue'
      || status == 'in_progress'){
        return true;
      }else{
        return false;
      }
  }),
  actions: {
    submitPad(pad) {
      pad.submit().then((result) => {
        this.set('result', result);
      });
      this.set('showLoader', true);
    },
    removeLoader() {
      this.set('showLoader', false);
    }
  }
});
