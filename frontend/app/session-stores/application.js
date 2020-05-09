import Cookie from 'ember-simple-auth/session-stores/cookie';
import config from 'frontend/config/environment';

export default class ApplicationSessionStore extends Cookie {

  init(...args) {
    super.init(...args);
    this.cookieDomain = config.cookieDomain;
  }
}
