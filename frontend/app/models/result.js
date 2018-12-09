import DS from 'ember-data';

export default DS.Model.extend({
  output: DS.attr(),
  error: DS.attr(),
  pad_id: DS.attr()
});
