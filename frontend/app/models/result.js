import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr(),
  error: DS.attr(),
  runner: DS.attr(),
  htmlOutput: DS.attr(),
});
