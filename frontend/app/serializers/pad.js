import ApplicationSerializer from './application';
export default ApplicationSerializer.extend({
    primaryKey: 'slug',
    normalize: function (type, hash) {
        hash.id = hash.slug;
        return this._super(type, hash);
    }
});
