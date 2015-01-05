Ext.define('ConferenceApp.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',
    root: {
        text: 'ConferenceApp',
        expanded: true,
        children: [{
            text: 'Event',
            id: 'event',
            iconCls: 'event-node-icon',
            expanded: true,
            children: [{
                id: 'eventdetails',
                leaf: true,
                iconCls: 'arrow-icon',
                text: 'Event Details'
            }, {
                id: 'sponsors',
                leaf: true,
                iconCls: 'arrow-icon',
                text: 'Sponsors'
            }, {
                id: 'floorplan',
                leaf: true,
                iconCls: 'arrow-icon',
                text: 'Floor Plan'
            }]
        }, {
            text: 'Speakers',
            id: 'speakerslist',
            iconCls: 'speaker-node-icon',
            leaf: true
        }, {
            id: 'agendalist',
            leaf: true,
            iconCls: 'arrow-icon',
            text: 'Agenda'
            // text: 'Agenda',
            // id: 'agenda',
            // expanded: true,
            // iconCls:'agenda-node-icon',
            // children: [{
            //     id: 'agendalist',
            //     leaf: true,
            //     iconCls:'arrow-icon',
            //     text: 'Agenda List'
            // }]
        }, {
            text: 'Sponsorship Category List',
            id: 'sponsorshipcategorylist',
            iconCls: 'sponsor-node-icon',
            leaf: true,
        }, {
            text: 'Attendee',
            leaf: true,
            iconCls: 'attendee-node-icon',
            id: 'attendee'
                // }, {
                //     text: 'Login',
                //     iconCls:'login-node-icon',
                //     leaf: true,
                //     id: 'login'
        }]
    }
});
