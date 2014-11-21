Ext.define('StorageDemo.store.LogInSession', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.SessionStorage'
    ],
    config: {
        model: 'StorageDemo.model.LogInCredential',
        autoLoad: true,
        autoSync: true,
        proxy: {
            type: 'sessionstorage',
            id: 'loginsessionstorage'
        }
    }
});
