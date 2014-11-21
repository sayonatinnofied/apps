Ext.define('StorageDemo.store.Videos', {
    extend: 'Ext.data.Store',
    util: StorageDemo.util.Util,
    config: {
        model: 'StorageDemo.model.PageToken',
        autoLoad: true
    }
});