Ext.define('MapDemo.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    config: {
        layout: 'card',
        items: [{
            xtype:'placelist'
        },{
            xtype: 'infomap'
        }, {
            xtype: 'details'
        }]
    }
});
