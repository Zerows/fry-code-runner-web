import Mixin from '@ember/object/mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Mixin.create(AuthenticatedRouteMixin, {
    init(){
        this._super(...arguments);
        this.set('authenticationRoute', 'guest.signup')
    }
});
