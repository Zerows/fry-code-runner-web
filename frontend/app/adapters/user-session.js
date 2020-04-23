import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  authenticate(options) {
    const url = "/api/auth/login";
    return this.ajax(url, 'POST', {data: {email: options.email, password: options.password}}).then((data) => {
      this.store.pushPayload('session', data);
      return data;
    });
  },
  authenticateGuest(options) {
    const url = "/api/guest";
    return this.ajax(url, 'POST', {data: {name: options.name}}).then((data) => {
      this.store.pushPayload('session', data);
      return data;
    });
  }
});
