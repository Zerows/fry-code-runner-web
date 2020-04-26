import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  userSession: service('user-session'),
  actions: {
    onCreateQuestion() {
      this.set('showLanguagePicker', true);
    },
    onSelectLanguage(language) {
      this.set('showLanguagePicker', false);
      this.send('createQuestionAction', language);
    },
    deleteQuestion(question) {
      this.send('deleteQuestionAction', question);
    },
    onPickerHidden() {
      this.set('showLanguagePicker', false);
    },
  }
});
