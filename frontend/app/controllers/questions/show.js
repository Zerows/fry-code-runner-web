import Controller from '@ember/controller';
import { computed } from '@ember/object'

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('supportedLanguages', ['java', 'javascript', 'python', 'ruby'])
    this.set('difficulty', ['easy', 'medium', 'hard'])
  },
  
  showLoader: computed('result','saving', function () {
    let finalVal = this.get('saving');
    return finalVal;
  }),
  saving: false,
  saveText: computed('saving', function (){
    let result = this.get('saving');
    if(result){
      return 'Saving'
    }else{
      return 'Save'
    }
  }),
  actions: {
    saveQuestion(question) {
      this.set('saving', true);
      question.save().then(() => {
        this.set('saving', false);
      });
    }
  }
});
