import Controller from '@ember/controller';
import {computed} from '@ember/object'
import {inject as service} from '@ember/service';

export default Controller.extend({
  userSession: service('user-session'),//user fro user related session props in hbs
  actions: {
    saveQuestion(question) {
      this.send('saveQuestionAction', question)
    },
    onUpdate(event, val) {
      this.model.set('content', val);
    },
    dryRun(question) {
      this.send('dryRunAction', question)
    }
  },
  saveText: computed('saving', function () {
    if (this.saving) {
      return 'Saving'
    } else {
      return 'Save'
    }
  }),
  showLoader: computed('polling', 'saving', function () {
    let finalVal = this.polling || this.saving;
    return finalVal;
  }),
});
