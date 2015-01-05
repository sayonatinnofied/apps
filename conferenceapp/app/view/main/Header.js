Ext.define('ConferenceApp.view.main.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    id: 'app-header',
    title: 'Conference',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },

    initComponent: function() {
        var me = this,
            util = ConferenceApp.util.Util;
        document.title = me.title;

        me.items = [{
            xtype: 'component',
            cls: 'app-header-logo'
        }, {
            xtype: 'component',
            cls: 'app-header-title',
            html: me.title,
            flex: 1
        }, {
            xtype: 'container',
            cls: 'admin-name',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [{
                html:Ext.decode(localStorage.getItem('AdminDetails')).name
            }, {
                xtype: 'button',
                cls: 'logout-btn',
                glyph: 0xf08b,
                name:'logout_btn',
                tooltip: 'Logout',
                handler: 'logOut'
            }]
        }];
        me.callParent();
    }
});
