import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr(),
  error: DS.attr(),
  pad: DS.attr(),
  htmlOutput: DS.attr(),
});
