import Controller from '@ember/controller';

export default Controller.extend({
  supportedLanguages: ['java', 'javascript', 'python', 'ruby'],
  output: null,
  actions: {
    submitPad(pad) {
      let padResult = pad.save();
      // show loader
    }
  }
});
