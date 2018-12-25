import Component from '@ember/component';
import { once } from '@ember/runloop'

export default Component.extend({
    didReceiveAttrs() {
        this._super(...arguments);
        let size = this.get('size') || 10;
        this.set('size', size);
      },
      didInsertElement(){
        this.$().css('display', 'inline-block');
        once('afterRender', () => {
            let loaders = this.$('.loading-dots--dot')
            let size = this.get('size');
            loaders.height(size);
            loaders.width(size);
            loaders.css('border-radius', size/2 + "px");
          });
      }
});
