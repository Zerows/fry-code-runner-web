import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { later } from '@ember/runloop';

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
    this.set('difficulty', ['easy', 'medium', 'hard'])
  },

  showLoader: computed('saving', function () {
    let finalVal = this.get('saving');
    return finalVal;
  }),
  saving: false,
  canShowPads: false,
  saveText: computed('saving', function () {
    let result = this.get('saving');
    if (result) {
      return 'Saving'
    } else {
      return 'Save'
    }
  }),
  maxPoll: 10,
  poll(current = 0) {
    let result = this.get('result');
    later(() => {
      result.reload().then((model) => {
        this.notifyPropertyChange('result');
        let canPoll = model.status == 'in_queue' || model.status == 'in_progress';
        canPoll = canPoll && current <= this.get('maxPoll');
        if (canPoll) {
          this.poll(++current);
        }
        if(current >= this.get('maxPoll')){
          model.set('status', 'cancelled');
        }
      })
    }, 1000);
  },
  actions: {
    saveQuestion(question) {
      this.set('saving', true);
      question.save().then(() => {
        this.set('saving', false);
      });
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
