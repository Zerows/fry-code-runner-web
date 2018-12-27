import Component from '@ember/component';

export default Component.extend({
    images: [],
    config: {},
    didInsertElement() {
        Ember.run.scheduleOnce('afterRender', this, function () {
            this.$().backstretch(
                this.get('images'),
                this.get('config')
            );
        });
    },
    willDestroyElement() {
        this.$().backstretch("destroy", true);
    }
});
