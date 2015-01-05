Ext.define('ConferenceApp.store.SponsorshipCategories', {
    extend: 'Ext.data.ArrayStore',
    alias: 'store.sponsorshipcategories',
    model: 'ConferenceApp.model.SponsorshipCategory',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
    },

    listeners: {
        beforeload: function() {
            ConferenceApp.util.Util.setProxyUrl(this, "sponsorshipCategories");
        }
    }
});
