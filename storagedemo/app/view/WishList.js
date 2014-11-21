Ext.define('StorageDemo.view.WishList', {
    extend: 'Ext.dataview.List',
    xtype: 'wishlist',
    config: {
        items: [{
            xtype: 'toolbar',
            title: 'Wish List',
            docked: 'top',
            items:[{
            	xtype:'button',
            	ui:'back',
            	name:'back_btn',
            	text:'Back'
            }]
        }],
        emptyText:'No Videos Added',
        striped: true,
        itemTpl: document.getElementById('list_template').innerHTML,
        store: 'Wishes'
    }
});
