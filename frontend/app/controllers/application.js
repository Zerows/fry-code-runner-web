import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  session: service(),
  userSession: service('user-session'),
  temp: "asasdasda",
  authenticate() {
    let {identification, password} = {identification: this.identification, password: this.password};
    this.session.authenticate('authenticator:custom', identification, password).catch((reason) => {
      this.set('errorMessage', reason.error || reason);
    });
  },

  actions: {
    invalidateSession() {
      this.session.invalidate();
      this.transitionToRoute("index");
    }
  }
});
