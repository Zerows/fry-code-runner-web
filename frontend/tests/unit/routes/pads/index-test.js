import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | pads/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:pads/index');
    assert.ok(route);
  });
});
