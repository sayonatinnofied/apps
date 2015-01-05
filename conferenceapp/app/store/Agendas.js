Ext.define('ConferenceApp.store.Agendas', {
    extend: 'Ext.data.Store',
    model: 'ConferenceApp.model.Agenda',
    storeId: 'agendas',
    autoLoad: true,

    sorters: [{

        sorterFn: function(record1, record2) {
            var time1 = record1.data.startingTime,
                time2 = record2.data.startingTime;

            // Sort by startingTime of agenda, in ascending order 
            // Time fromat example:- 09:02 AM, 05:12 PM etc.

            return time1.charAt(6) > time2.charAt(6) ? 1 :
                (time1.charAt(6) === time2.charAt(6) ?
                    (time1.slice(0, 2) > time2.slice(0, 2) ? 1 :
                        (time1.slice(0, 2) === time2.slice(0, 2) ?
                            (time1.slice(3, 5) > time2.slice(3, 5) ? 1 :
                                (time1.slice(3, 5) === time2.slice(3, 5) ?
                                    0 : -1)) : -1)) : -1);
        },

        direction: 'ASC'
    }],

    groupField: 'agendaDate',
    groupDir: 'ASC',

    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        beforeload: function() {
            ConferenceApp.util.Util.setProxyUrl(this, "agendas");
        }
    },
});
