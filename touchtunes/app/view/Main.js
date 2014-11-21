Ext.define('TouchTunes.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.dataview.List',
        'Ext.Img'
    ],
    config: {
        layout:'fit',
        items:[{
            xtype:'toolbar',
            title:'TouchTunes',
            docked:'top'
        },{
            layout:'hbox',
            items:[{
                xtype:'container',
                name:'video_box',
                flex:3,
                layout:{
                    type:'vbox',
                    pack:'center',
                    align:'center'
                },
                items:[{
                    name:'video_art',
                    xtype:'image',
                    // src:'',
                    width:400,
                    height:300
                }]
            },{
                flex:2,
                xtype:'list',
                name:'video_playlist',
                itemTpl:'<div>{artist} – {title}</div>',
                store:'Videos'
            }]
        }]
    }
});
