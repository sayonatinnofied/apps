Ext.define('StorageDemo.store.LogInLocal', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        model: 'StorageDemo.model.LogInCredential',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'localstorage',
            id: 'loginlocalstorage'
        }
    }
});
