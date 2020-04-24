import Base from 'ember-simple-auth/authenticators/base';
import {Promise} from 'rsvp';
import {isEmpty} from '@ember/utils'
import {inject as service} from '@ember/service';
import {run} from '@ember/runloop'

export default Base.extend({
  store: service(),
  session: service('user-session'),
  restore: function (data) {
    this.session.save(data)
    return new Promise((resolve, reject) => {
      if (!isEmpty(this.session.token())) {
        resolve(this.session.data);
      } else {
        reject();
      }
    });
  },

  authenticate: function (options) {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.session.authenticate(options)
        this.session.save({
          session: response,
          token: response.userSession.token
        })
        run(() => {
          resolve(this.session.data)
        })
      } catch (error) {
        run(() => {
          reject(error);
        })

      }
    });
  },

  invalidate: function () {
    return this.session.invalidate()();
  }
});
