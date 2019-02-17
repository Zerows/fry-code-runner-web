import Controller from '@ember/controller';
import {computed} from '@ember/object'
import CodeRunner from '../../mixins/code-runner'
import {inject as service} from '@ember/service';
import {run} from '@ember/runloop'

export default Controller.extend(CodeRunner, {
  session: service(),
  websockets: service('socket-io'),
  socket: null,
  canPublish: true,
  init() {
    this._super(...arguments);
    const socket = this.websockets.socketFor('ws://192.168.1.226:4000');
    this.set('socket', socket);
    socket.on('connect', () => {
      console.log('connect');
    });
    socket.on('event', (message) => {
      console.log(message);
      var deltas = [];
      deltas[0] = message;
      run(() => {
        this.set('canPublish', false);
        this.get('editor').getSession().getDocument().applyDeltas(deltas);
        this.set('canPublish', true);
      });
    });
    socket.on('close', () => {
      console.log('close');
    });

  },
  submitText: computed('result', function () {
    let result = this.get('result');
    let status = result != null ? result.get('status') : "";
    if (status == 'in_queue') {
      return "Submitting"
    } else if (status == 'in_progress') {
      return "In Progress"
    } else if (status == 'cancelled') {
      return "Retry";
    } else {
      return "Run";
    }
  }),
  actions: {
    submitPad(pad) {
      //A temp record to show the status immesiately
      let tempResult = this.store.createRecord('result', {
        status: 'in_queue'
      });
      this.set('result', tempResult);
      pad.submit().then((result) => {
        //make sure we unload the temp record
        tempResult.unloadRecord();
        this.set('result', result);
        this.poll();
      }, (err) => {
        console.log(err);
      });
    },
    save(pad) {
      this.set('saving', true);
      pad.save().then(() => {
        this.set('saving', false);
      }, (err) => {
        this.set('saving', false);
      });
    },
    onEditorReady(editor) {
      this.set('editor', editor);
    },
    onUpdate(event, val) {
      this.get('model').set('content', val);
      run(() => {
        if (this.get('canPublish')) {
          this.get('socket').emit('event', event);
        }
      });
    },
    showQuestionModal() {
      this.send('fetchQuestions', this);
      this.set('showQuestions', true);
    },
    onQuestionsHidden() {
      this.set('showQuestions', false);
    },
    onSelect(question) {
      let model = this.get('model');
      model.setProperties({
        'content': question.content,
        'language': question.language
      });
      this.set('showQuestions', false);
    }
  },
});
