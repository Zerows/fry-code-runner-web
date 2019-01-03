import EmberObject from '@ember/object';
import CodeRunnerMixin from 'frontend/mixins/code-runner';
import { module, test } from 'qunit';

module('Unit | Mixin | code-runner', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let CodeRunnerObject = EmberObject.extend(CodeRunnerMixin);
    let subject = CodeRunnerObject.create();
    assert.ok(subject);
  });
});
