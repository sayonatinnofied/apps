Ext.define('ConferenceApp.store.Attendee', {
    extend: 'Ext.data.Store',
    alias: 'store.attendee',
    autoLoad: true,

    fields: [
        'id',
        'userEvent',
        'role',
        'name',
        'email',
        'password',
        'bio',
        'designation',
        'companyName'
    ],

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        beforeload: function() {
            ConferenceApp.util.Util.setProxyUrl(this, "attendees");
        }
    }
});
