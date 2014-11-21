Ext.define('MapDemo.view.PlaceList', {
    extend: 'Ext.dataview.List',
    xtype: 'placelist',
    config: {
        items:[{
            xtype:'titlebar',
            docked:'top',
            title:'Places'
        }],
        itemTpl:'<div>{name}</div>',
        onItemDisclosure:true,
        store:'Places'
    }
});