import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    if (this.top != null && this.bottom != null) {
      let top = this.top.offsetTop + this.top.offsetHeight
      let bottom = this.bottom.offsetTop
      let lineHeight = (this.fontSize * this.lineHeight) || 20
      let height = bottom - top;
      this.set('height', height + 'px')
      this.set('lines', height / lineHeight)
    }
  },
  didInsertElement() {

  }
});
