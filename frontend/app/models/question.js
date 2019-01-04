import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  title: DS.attr('string'),
  language: DS.attr('string'),
  difficulty: DS.attr(),
  slug: DS.attr('string'),

  dryRun(){
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.dryRun(this);
  }
});
