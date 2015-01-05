Ext.define('ConferenceApp.model.Event', {
    extend: 'ConferenceApp.model.Base',
    // alias: 'model.event',
    fields: [{
        name: 'adminId',
        mapping: '_id',
        convert: function(value) {
            return '53db417f6d8c0afb2d4986d1';
        }
    }, {
        name: 'eventId',
        mapping: '_id'
    }, {
        name: 'eventName',
        type: 'string',
        mapping: 'name'
    }, {
        name: 'website'
            // convert: function(value) {
            //     return ('http://' + value);
            // }
    }, {
        name: 'coverImage',
        mapping: 'coverImage.url',
        convert: function(value) {
            return ('http://192.168.2.2:8000/' + value);
        }
    }, {
        name: 'eventLogo',
        mapping: 'brandLogo.url',
        convert: function(value) {
            return ('http://192.168.2.2:8000/' + value);
        }
    }, {
        name: 'dateSpan'
    }, {
        name: 'startdate',
        mapping: 'dateSpan.from',
        convert: function(value) {
            if (value)
                return new Date(value).toLocaleDateString();
            else
                return new Date();
        }
    }, {
        name: 'enddate',
        mapping: 'dateSpan.to',
        convert: function(value) {
            if (value)
                return new Date(value).toLocaleDateString();
            else
                return new Date();
        }
    }, {
        name: 'location',
        mapping: 'location'
    }, {
        name: 'floorPlanImage',
        mapping: 'floorPlan.url',
        convert: function(value) {
            return ('http://192.168.2.2:8000/' + value);
        }

    }]
});
