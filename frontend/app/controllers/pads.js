import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createPad() {
      //let newPad = this.get('newPad');
      let newPad = "test";
      let newRecord = this.store.createRecord('pad', {
        content: newPad,
        language: newPad,
        filename: newPad
      });
      newRecord.save();
    },

    updatePad() {
      // hard coding the id for demonstration purposes only
      let updatedPad = this.get('updatedPad');
      let pad = this.get('model').findBy('id', '1');
      pad.set('content', updatedPad);
      pad.save()
    },
  }
});
