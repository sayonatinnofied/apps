Ext.define('ConferenceApp.view.main.ContentPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'ConferenceApp.view.event.FloorPlan',
        'ConferenceApp.view.event.EventDetails',
        'ConferenceApp.view.event.Sponsors',
        'ConferenceApp.view.agenda.*',
        'ConferenceApp.view.speakers.SpeakersList',
        'ConferenceApp.view.speakers.AddSpeaker',
        'ConferenceApp.view.main.mainview.Attendee',
        'ConferenceApp.view.sponsorshipcategory.SponsorshipCategoryList',
        'ConferenceApp.view.sponsorshipcategory.AddSponsorshipCategory',
        'ConferenceApp.view.login.Login'
    ],
    xtype: 'contentpanel',
    id: 'content-panel',
    bodyCls: 'content-panel-body-content',
    autoScroll: true,

    header: {
        hidden: true
    },

    items: [{
        // xtype: 'eventdetails'
    }]
});
