import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  language: DS.attr('string'),
  filename: DS.attr('string'),
});
