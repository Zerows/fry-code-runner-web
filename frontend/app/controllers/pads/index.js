import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createPad() {
      let language = "javascript";
      let newRecord = this.store.createRecord('pad', {
        language: language
      });
      newRecord.save().then((record) => {
        this.transitionToRoute('pads.show', record)
      });
    },

    deletePad(pad) {
      pad.destroyRecord();
    }
  }
});
