import Base from 'ember-simple-auth/authenticators/base';
import {Promise, resolve} from 'rsvp';
import {isEmpty} from '@ember/utils'
import $ from 'jquery'
import {run} from '@ember/runloop'

export default Base.extend({
  tokenEndpoint: 'http://localhost:3000/api/auth/login',
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
    return new Promise((resolve, reject) => {
      $.ajax({
        url: this.tokenEndpoint,
        type: 'POST',
        data: JSON.stringify({
          email: options.email,
          password: options.password
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then(function (response) {
        run(function () {
          resolve({
            token: response.auth_token
          });
        });
      }, function (xhr, status, error) {
        let response = xhr.responseJSON;
        run(function () {
          reject(response);
        });
      });
    });
  },

  invalidate: function () {
    return resolve();
  }
});
