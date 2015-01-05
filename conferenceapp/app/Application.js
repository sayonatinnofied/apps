/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('ConferenceApp.Application', {
    extend: 'Ext.app.Application',

    name: 'ConferenceApp',

    requires: ['ConferenceApp.util.Util'],

    stores: [
        // TODO: add global / shared stores here
        'Navigation',
        'Sponsors',
        'Attendee',
        'Agendas',
        'Events',
        'SponsorshipCategories',
        'Speakers'
    ],
    views: [
        'login.Login',
        'main.mainview.Main'
    ],

    models: [
        'Event'
    ],

    controllers: [
        'App'
    ],

    init: function() {
        var me = this;
        Ext.setGlyphFontFamily('FontAwesome');
        // console.log(me);
        // me.setDefaultToken('eventdetails');
    },

    launch: function() {
        var me = this,
            // any type of storage, i.e., Cookies, LocalStorage, etc.
            supportsLocalStorage = Ext.supports.LocalStorage,
            loggedIn;
        if (!supportsLocalStorage) {

            // Alert the user if the browser does not support localStorage
            Ext.Msg.alert('Your Browser Does Not Support Local Storage');
            return;
        }

        // Check to see the current value of the localStorage key
        loggedIn = localStorage.getItem("LoggedInCredentials");
        adminDetails = Ext.decode(localStorage.getItem("AdminDetails"));
        // console.log(adminDetails);

        // This ternary operator determines the value of the TutorialLoggedIn key.
        // If TutorialLoggedIn isn't true, we display the login window,
        // otherwise, we display the main view        

        if (loggedIn || adminDetails) {
            Ext.widget('app-main');
            if (window.location.hash === '' || window.location.hash === '#login' || window.location.hash === '#event') {
                window.location.hash = 'event/eventdetails';
            }
        } else {
            window.location.hash = "login";
        }

    }
});
