import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  authenticator: 'authenticator:custom',
  logging: false,
  session: service(),
  actions: {
    async authenticate(credentials) {
      this.set('logging', true);
      try {
        await this.session.authenticate(this.authenticator, credentials)
        this.set('logging', false);
      } catch (error) {
        this.set('logging', false);
        this.set('errors', error.payload.errors);
      }
    }
  }
});
