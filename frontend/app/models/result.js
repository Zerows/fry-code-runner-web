import Model, {attr} from '@ember-data/model';

export default Model.extend({
  status: attr(),
  error: attr(),
  pad: attr(),
  htmlOutput: attr()
});
