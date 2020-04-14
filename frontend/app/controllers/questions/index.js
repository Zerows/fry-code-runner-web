import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createQuestion() {
      //let language = "javascript";
      let newRecord = this.store.createRecord('question', {
      });
      newRecord.save().then((record) => {
        this.transitionToRoute('questions.show', record.slug)
      });
    },

    deleteQuestion(question) {
      question.destroyRecord();
    }
  }
});
