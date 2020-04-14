import Model, {attr} from '@ember-data/model';

export default Model.extend({
  content: attr('string'),
  title: attr('string'),
  language: attr('string'),
  difficulty: attr(),
  slug: attr('string'),

  dryRun() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.dryRun(this);
  }
});
