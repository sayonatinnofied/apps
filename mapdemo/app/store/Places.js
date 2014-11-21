Ext.define('MapDemo.store.Places', {
    extend : 'Ext.data.Store',
    config : {
        model : 'MapDemo.model.Place',
        autoLoad:true,
        proxy: {
            type: 'ajax',
            url: 'app/data/MapData.json',
            reader: {
                type: 'json',
                rootProperty :'places'
            }
        }
    }
});