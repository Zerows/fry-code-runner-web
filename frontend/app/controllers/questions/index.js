import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createQuestion() {
      let language = "javascript";
      let title = "code-fry-question"+new Date().getTime().toString();
      let newRecord = this.store.createRecord('question', {
        content: "",
        language: language,
        title: title
      });
      newRecord.save().then((record) => {
        this.transitionToRoute('questions.show', record.get('id'))
      });
    },

    deleteQuestion(question) {
      question.destroyRecord();
    }
  }
});
