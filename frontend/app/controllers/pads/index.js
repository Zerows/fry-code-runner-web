import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createPad() {
      this.send('createPadAction')
    },

    deletePad(pad) {
      this.send('destroyPadAction', pad)
    }
  }
});
