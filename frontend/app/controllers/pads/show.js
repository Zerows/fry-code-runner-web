import Controller from '@ember/controller';
import {computed} from '@ember/object'
import {inject as service} from '@ember/service';

export default Controller.extend({
  session: service(),//used in hbs for authenticated
  saveText: computed('saving', function () {
    if (this.saving) {
      return 'Saving'
    } else {
      return 'Save'
    }
  }),
  submitText: computed('result', 'polling', function () {
    let result = this.result;
    let status = result != null ? result.status : "";
    let text = null
    if (status == 'in_queue') {
      text = "Submitting"
    } else if (status == 'in_progress') {
      text = "In Progress"
    } else if (status == 'cancelled') {
      text = "Retry";
    } else {
      text = "Run";
    }
    return text
  }),

  showLoader: computed('polling', 'saving', function () {
    let finalVal = this.polling || this.saving;
    return finalVal;
  }),

  setDelta(editorDeltas) {
    this.editor.getSession().getDocument().applyDeltas(editorDeltas);
  },
  actions: {
    submitPad(pad) {
      this.send('submitPadAction', pad);
    },
    save(pad) {
      this.send('savePad', pad);
    },
    onEditorReady(editor) {
      this.set('editor', editor);
    },
    onUpdate(event, val) {
      this.model.set('content', val);
      this.send('onEdit', event);
    },
    showQuestionModal() {
      this.send('fetchQuestions');
      this.set('showQuestions', true);
    },
    onQuestionsHidden() {
      this.set('showQuestions', false);
    },
    onSelect(question) {
      let model = this.model;
      model.setProperties({
        'content': question.content,
        'language': question.language
      });
      this.set('showQuestions', false);
    }
  },
});
