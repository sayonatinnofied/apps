Ext.define('MapDemo.view.InfoMap', {
    extend: 'Ext.Container',
    xtype: 'infomap',
    requires: ['Ext.Map', 'Ext.TitleBar'],
    config: {
        layout: 'fit',
        items: [{
            docked: 'top',
            xtype: 'toolbar',
            title: 'Map with InfoBubble',
            items: [{
                xtype:'button',
                ui:'back',
                name:'back_to_place_list_btn',
                text:'Back',
                left:0
            },{
                xtype:'button',
                text:'Direction to Current Location',
                right:0,
                name:'current_location_btn'
            }]
        }, {
            xtype: 'map',
            mapOptions:{
                zoom:12
            },
            name: 'info_map'
        }]
    }
});
