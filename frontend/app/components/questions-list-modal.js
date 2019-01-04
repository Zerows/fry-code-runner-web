import Component from '@ember/component';

export default Component.extend({
    actions: {
        onSelect: function (question) {
            this.onSelect(question);
        }
    }
});
