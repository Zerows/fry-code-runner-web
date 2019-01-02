import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    dryRun(model) {
        const url = this.buildURL('questions', model.get('id')) + "/run";
        return this.ajax(url, 'PUT', { data: { question: model } }).then((data) => {
            this.store.pushPayload('pad', data);
            return this.store.find('pad', data.pad.id); 
        });
    }
});
