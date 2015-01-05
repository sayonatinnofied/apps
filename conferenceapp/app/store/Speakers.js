Ext.define('ConferenceApp.store.Speakers', {
    extend: 'Ext.data.Store',
    alias: 'store.speakers',
    model: 'ConferenceApp.model.Speaker',
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
            ConferenceApp.util.Util.setProxyUrl(this, "speakers");
        }
    }
});
