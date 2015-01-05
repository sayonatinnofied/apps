Ext.define('ConferenceApp.store.Events', {
    extend: 'Ext.data.Store',
    alias: 'store.events',
    model: 'ConferenceApp.model.Event',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    // listeners: {
        // load: function(store,records,successful,e) {
        //     // console.log(successful,e,records,store);
        //     if(!successful){
        //         Ext.Msg.alert('Connection Error','Server not found')
        //     }
        // }
    // }
});
