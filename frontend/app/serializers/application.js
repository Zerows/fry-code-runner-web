import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    primaryKey: 'slug',
    normalize: function (type, hash) {
        hash.id = hash.slug;
        return this._super(type, hash);
    }
});
