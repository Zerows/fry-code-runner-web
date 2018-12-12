import Component from '@ember/component';

export default Component.extend({
  actions: {
    login() {
      let credentials = this.getProperties('email', 'password');
      this.authenticate(credentials);
    }
  }
});
