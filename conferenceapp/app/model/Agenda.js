Ext.define('ConferenceApp.model.Agenda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'title',
            type: 'string'
        }, {
            name: 'location'
        }, {
            name: 'startingTime',
            type: 'string',
            
            convert: function(value, record) {

                //Example of returned string:- 09:02 AM
                return Ext.Date.format(new Date(record.data.dateSpan.from), 'h:i A');
            }
        }, {
            name: 'endingTime',
            type: 'string',

            convert: function(value, record) {

                //Example of returned string:- 09:02 PM
                return Ext.Date.format(new Date(record.data.dateSpan.to), 'h:i A');
            }
        }, {
            name: 'agendaDay',
            type: 'string',

            convert: function(value, record) {

                var agendaDate = new Date(record.data.dateSpan.from);

                //Example of returned string:- DAY 2 - Monday, November 3, 2014
                return 'DAY ' + (Number(Ext.Date.format(agendaDate, 'N')) + 1) +
                    Ext.Date.format(agendaDate, ' - l, F j, Y');
            }
        }, {
            name: 'agendaDate',
            type: 'string',

            convert: function(value, record) {

                var agendaDate = new Date(record.data.dateSpan.from);

                //Example of returned string:- NOV 04, 2014
                return Ext.Date.format(agendaDate, 'M').toUpperCase() +
                    Ext.Date.format(agendaDate, ' d, Y');
            }
        }, {
            name: 'speakers',

            convert: function(value, record) {

                var speakerArray = record.data.speakers,
                    length = speakerArray.length;

                for (var i = 0; i < length; i++) {
                    speakerArray[i] = speakerArray[i].speaker;
                    speakerArray[i].profilePicture = speakerArray[i].profilePicture.url;
                }

                return speakerArray;
            }
        }

    ]
});
