Ext.define('StorageDemo.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: 'card',
        items: [{
            xtype: 'login'
        }, {
            xtype: 'videoslists'
        }, {
            xtype: 'wishlist'
        }]
    }
});
