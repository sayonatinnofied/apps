Ext.define('StorageDemo.store.Wishes', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        model: 'StorageDemo.model.Video',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'localstorage',
            id: 'wishlistlocalstorage'
        }
    }
});
