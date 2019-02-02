import Controller from '@ember/controller';
import { computed } from '@ember/object'
import CodeRunner from '../../mixins/code-runner'
import { inject as service } from '@ember/service';

export default Controller.extend(CodeRunner, {
  session: service(),
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
      },(err) => {
        this.set('saving', false);
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
