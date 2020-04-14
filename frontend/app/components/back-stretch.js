import Component from '@ember/component';
import {scheduleOnce} from '@ember/runloop';

export default Component.extend({
  images: [],
  config: {},
  didInsertElement() {
    scheduleOnce('afterRender', this, this.afterRender);
  },
  willDestroyElement() {
    this.$().backstretch("destroy", true);
  },
  afterRender() {
    this.$().backstretch(
      this.images,
      this.config
    );
  }
});
