import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
    authenticator: 'authenticator:guest',
    session: service(),
    actions: {
        signup() {
            let options  = {name: this.get('name')};
            this.get('session').authenticate(this.authenticator, options).catch((message) => {
                this.set('logging', false);
                this.set('error', message);
              });
        }
    }
});
