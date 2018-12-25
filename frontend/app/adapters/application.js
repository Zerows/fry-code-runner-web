import DS from 'ember-data';
import { inject as service } from '@ember/service';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  host: 'http://localhost:3000/api',
  session: service(),
  authorize(xhr) {
    let { token } = this.get('session.data.authenticated');
    if (token !== undefined) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
  }
});