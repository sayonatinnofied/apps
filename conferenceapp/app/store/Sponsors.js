Ext.define('ConferenceApp.store.Sponsors', {
    extend: 'Ext.data.Store',
    alias: 'store.sponsors',
    model: 'ConferenceApp.model.Sponsor',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        beforeload: function() {
            ConferenceApp.util.Util.setProxyUrl(this, "sponsors");
        },
        load:function(store,records,successful){
            if(!successful){
                 Ext.Msg.alert('Connection Error', 'Server not found');
            }
        }
    }
});
