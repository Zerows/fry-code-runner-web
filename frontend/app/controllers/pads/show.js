import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop'

export default Controller.extend({
  session: service(),
  websockets: service('socket-io'),
  socket: null,
  canPublish: true,
  init() {
    this._super(...arguments);
    //const socket = this.websockets.socketFor('ws://192.168.1.226:4000');
    //this.set('socket', socket);
    // socket.on('connect', () => {

    // });
    // socket.on('event', (message) => {
    //   var deltas = [];
    //   deltas[0] = message;
    //   run(() => {
    //     this.set('canPublish', false);
    //     this.editor.getSession().getDocument().applyDeltas(deltas);
    //     this.set('canPublish', true);
    //   });
    // });
    // socket.on('close', () => {

    // });

  },
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
      run(() => {
        if (this.canPublish) {
          //this.socket.emit('event', event);
        }
      });
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
