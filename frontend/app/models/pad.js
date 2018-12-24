import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  language: DS.attr('string'),
  filename: DS.attr('string'),

  submit(){
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.submit(this);
  }
});
