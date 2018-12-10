import Controller from '@ember/controller';

export default Controller.extend({
  supportedLanguages: ['java', 'javascript', 'python', 'ruby'],
  showLoader: false,
  actions: {
    submitPad(pad) {
      let padResult = pad.save();
      // show loader
      this.set('showLoader', true);
    },
    removeLoader() {
      this.set('showLoader', false);
    }
  }
});
