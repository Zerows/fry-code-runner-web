import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  submit(model) {
    const url = this.buildURL('pads', model.get('id')) + "/submit";
    return this.ajax(url, 'PUT', {data: {pad: model}}).then((data) => {
      this.store.pushPayload('result', data);
      return this.store.find('result', data.result.id);
    });
  },
  createGuestPad(model) {
    const url = this.buildURL('pads', 'guest');
    return this.ajax(url, 'POST', {data: {pad: model}}).then((data) => {
      this.store.pushPayload('pad', data);
      return this.store.find('pad', data.pad.id);
    });
  }
});
