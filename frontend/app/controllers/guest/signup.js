import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    authenticator: 'authenticator:guest',
    session: service(),
    logging: false,
    actions: {
        signup() {
          this.set('logging', true);
          let options = {name: this.name};
          this.session.authenticate(this.authenticator, options).catch((message) => {
            this.set('logging', false);
            this.set('error', message);
          });
        }
    }
});
