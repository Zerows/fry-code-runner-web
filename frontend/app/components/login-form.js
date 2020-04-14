import Component from '@ember/component';

export default Component.extend({
  actions: {
    login() {
      let credentials = {email: this.email, password: this.password};
      this.authenticate(credentials);
    }
  }
});
