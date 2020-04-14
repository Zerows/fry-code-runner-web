import Model, {attr} from '@ember-data/model';

export default Model.extend({
  content: attr('string'),
  language: attr('string'),
  filename: attr('string'),
  slug: attr('string'),

  submit() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.submit(this);
  }
});
