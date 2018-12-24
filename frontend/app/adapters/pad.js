import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    submit(model) {
        const url = this.buildURL('pads', model.get('id')) + "/submit";
        return this.ajax(url, 'PUT', { data: { pad: model } });
    }
});
