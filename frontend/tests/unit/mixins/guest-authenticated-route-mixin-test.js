import EmberObject from '@ember/object';
import GuestAuthenticatedRouteMixinMixin from 'frontend/mixins/guest-authenticated-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | GuestAuthenticatedRouteMixin', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let GuestAuthenticatedRouteMixinObject = EmberObject.extend(GuestAuthenticatedRouteMixinMixin);
    let subject = GuestAuthenticatedRouteMixinObject.create();
    assert.ok(subject);
  });
});
