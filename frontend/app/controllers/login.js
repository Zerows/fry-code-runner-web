import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  authenticator: 'authenticator:custom',
  logging: false,
  session: service(),
  actions: {
    authenticate(credentials) {
      this.set('logging', true);
      this.get('session').authenticate(this.authenticator, credentials).catch((message) => {
        this.set('logging', false);
        this.set('error', message);
      });
    }
  }
});
