import Controller from '@ember/controller';

export default Controller.extend({
  supportedLanguages: ['java', 'javascript', 'python', 'ruby'],
  actions: {
    submitPad(pad) {
      pad.save();
      // show loader
    }
  }
});
