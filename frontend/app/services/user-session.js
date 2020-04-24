import Service, {inject as service} from '@ember/service';

export default Service.extend({
  data: null,
  ajax: service(),
  save(data) {
    this.set('data', data)
  },
  async invalidate() {
    this.set('data', null)
  },
  async authenticate(options) {
    const url = "/api/auth/login";
    return await this.ajax.post(url, {data: {email: options.email, password: options.password}});
  },

  async authenticateGuest(options) {
    const url = "/api/guest";
    return await this.ajax.post(url, {data: {name: options.name}});
  },
  token() {
    return this.data.session.userSession.token
  }
});
