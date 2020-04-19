import Component from '@ember/component';


export default Component.extend({
  height: 10,
  width: 10,
  radius: 10,
  didReceiveAttrs() {
    this._super(...arguments);
    let size = this.size || 10;
    this.set('size', size);
  },
  didInsertElement() {
    this.element.style.setProperty('display', 'inline-block')
    this.set('height', this.size+"px");
    this.set('width', this.size+"px");
    this.set('radius', (this.size / 2)+ "px");
    this.set('display', "inline-block");
  }
});
