import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  authenticator: 'authenticator:custom',
  session: service(),
  actions: {
    authenticate(credentials) {
      this.get('session').authenticate('authenticator:custom', credentials).catch((message) => {
        this.set('error', message);
      });
    }
  }
});
