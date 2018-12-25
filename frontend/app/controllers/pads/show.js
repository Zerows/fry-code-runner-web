import Controller from '@ember/controller';
import { computed } from '@ember/object'
import { later } from '@ember/runloop';

export default Controller.extend({
  init() {
    this._super(...arguments)
    this.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
  },
  isApiInProgress: function () {
    let result = this.get('result');
    let status = result != null ? result.get('status') : "";
    if (status == 'in_queue'
      || status == 'in_progress') {
        return true;
    } else {
      return false;
    }
  },
  showLoader: computed('result','saving', function () {
    let finalVal = this.isApiInProgress() || this.get('saving');
    return finalVal;
  }),
  saving: false,
  poll() {
    let result = this.get('result');
    later(() => {
      result.reload().then((model) => {
        this.notifyPropertyChange('result');
        if (model.status == 'in_queue' || model.status == 'in_progress') {
          this.poll();
        }
      })
    }, 1000);
  },
  saveText: computed('saving', function (){
    let result = this.get('saving');
    if(result){
      return 'Saving'
    }else{
      return 'Save'
    }
  }),
  submitText: computed('result', function () {
    let result = this.get('result');
    let status = result != null ? result.get('status') : "";
    if (status == 'in_queue') {
      return "Submitting"
    } else if (status == 'in_progress') {
      return "In Progress"
    } else {
      return "Run";
    }
  }),
  actions: {
    submitPad(pad) {
      pad.submit().then((result) => {
        this.set('result', result);
        this.poll();
      });
    },
    save(pad){
      this.set('saving', true);
      pad.save().then(() => {
        this.set('saving', false);
      });
    }
  }
});
