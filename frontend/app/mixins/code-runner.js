import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object'
import { later } from '@ember/runloop';

export default Mixin.create({
    init() {
        this._super(...arguments);
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
    showLoader: computed('result', 'saving', function () {
        let finalVal = this.isApiInProgress() || this.get('saving');
        return finalVal;
    }),
    saving: false,
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
                if (current >= this.get('maxPoll')) {
                    model.set('status', 'cancelled');
                }
            })
        }, 1000);
    }
});
