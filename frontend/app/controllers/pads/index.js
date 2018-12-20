import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createPad() {
      let language = "javascript";
      let filename = "code-fry-"+new Date().getTime().toString();
      let newRecord = this.store.createRecord('pad', {
        content: "",
        language: language,
        filename: filename
      });
      newRecord.save().then((record) => {
        this.transitionToRoute('pads.show', record.get('id'))
      });
    },

    deletePad(pad) {
      pad.destroyRecord();
    }
  }
});
