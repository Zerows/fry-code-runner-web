import Controller from '@ember/controller';

export default Controller.extend({
  showLoader: false,
  init() {
    this._super(...arguments)
    this.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
  },
  actions: {
    submitPad(pad) {
      pad.save();
      this.set('showLoader', true);
    },
    removeLoader() {
      this.set('showLoader', false);
    }
  }
});
