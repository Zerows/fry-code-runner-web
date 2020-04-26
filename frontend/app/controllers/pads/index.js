import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  userSession: service('user-session'),
  actions: {
    onCreatePad() {
      this.set('showLanguagePicker', true);
    },
    onSelectLanguage(language) {
      this.set('showLanguagePicker', false);
      this.send('createPadAction', language);
    },
    onPickerHidden() {
      this.set('showLanguagePicker', false);
    },
    deletePad(pad) {
      this.send('destroyPadAction', pad)
    }
  }
});
