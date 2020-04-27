import Service, {inject as service} from '@ember/service';
import {reads} from '@ember/object/computed';
import {computed} from '@ember/object';


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
  },
  socketUrl() {
    return this.data.session.userSession.socketUrl
  },
  hasRole(roleName) {
    try {
      let expectedRole = this.data.session.userSession.roles.filter(element => {
        let role = element.role
        return role.name == roleName
      });
      return expectedRole.length > 0
    } catch (error) {
      return false
    }
  },
  languages: reads('data.session.userSession.availableLanguages'),
  name: reads('data.session.userSession.name'),
  isMember: computed('data.session.userSession.roles', function () {
    return this.hasRole('member')
  })
});
