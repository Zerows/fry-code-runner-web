import Controller from '@ember/controller';
import CodeRunner from '../../mixins/code-runner'

export default Controller.extend(CodeRunner, {
  init() {
    this._super(...arguments);
    this.set('difficulty', ['easy', 'medium', 'hard'])
  },
  actions: {
    saveQuestion(question) {
      this.set('saving', true);
      question.save().then(() => {
        this.set('saving', false);
      });
    },
    onUpdate(event, val) {
      this.model.set('content', val);
    },
    dryRun(question) {
      let tempResult = this.store.createRecord('result', {
        status: 'in_queue'
      });
      this.set('result', tempResult);
      question.dryRun().then((result) => {
        //make sure we unload the temp record
        tempResult.unloadRecord();
        this.set('result', result);
        this.poll();
      });
    }
  }
});
