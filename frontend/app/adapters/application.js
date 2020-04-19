import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default RESTAdapter.extend({
  host: window.location.origin,
  namespace: 'api',
  session: service(),
  headers: computed(function () {
    let { token } = this.session.data.authenticated;
    if (token !== undefined) {
      return {
        'Authorization': `Bearer ${token}`,
      };
    } else {
      return {}
    }
  }),
  authorize(xhr) {
    let { token } = this.session.data.authenticated;
    if (token !== undefined) {
      xhr.setRequestHeader('Authorization');
    }
  }
});
