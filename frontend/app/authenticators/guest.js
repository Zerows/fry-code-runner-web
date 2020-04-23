import Base from 'ember-simple-auth/authenticators/base';
import {Promise, resolve} from 'rsvp';
import {isEmpty} from '@ember/utils'
import {inject as service} from '@ember/service';
import {run} from '@ember/runloop'

export default Base.extend({
  store: service(),
  restore: function (data) {
    return new Promise(function (resolve, reject) {
      if (!isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate: function (options) {
    let session = this.store.createRecord('user-session')
    return new Promise(async (resolve, reject) => {
      try {
        let data = await session.authenticateGuest(options)
        run(() => {
          resolve({
            token: data.auth_token
          });
        })
      } catch (error) {
        run(() => {
          reject(error);
        })
      }
    });
  },

  invalidate: function () {
    return resolve();
  }
});
