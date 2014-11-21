Ext.define('StorageDemo.view.VideosLists', {
    extend: 'Ext.Container',
    xtype: 'videoslists',
    requires: [
        'Ext.dataview.List',
        'Ext.plugin.ListPaging'
    ],
    config: {
        layout: 'fit',
        items: [{
            xtype: 'toolbar',
            title: 'Videos List',
            docked: 'top',
            items: [{
                xtype: 'button',
                text: 'Log Off',
                name: 'log_off',
                ui: 'action',
                right: 0
            }]
        }, {
            xtype: 'list',
            mode: 'MULTI',
            name: 'videos_list',
            striped: true,
            itemTpl: document.getElementById('list_template').innerHTML,
            store: 'Videos',
            plugins: [{
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true
            }],
        }, {
            xtype: 'toolbar',
            docked: 'bottom',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [{
                xtype: 'button',
                text: 'Add Selected Videos To Wish List',
                name: 'add_btn',
                ui: 'action'
            }]
        }]

    }
});
