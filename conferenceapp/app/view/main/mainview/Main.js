/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ConferenceApp.view.main.mainview.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'ConferenceApp.view.main.mainview.MainController',
        'ConferenceApp.view.main.mainview.MainModel',
        'ConferenceApp.view.main.Header',
        'ConferenceApp.view.main.ContentPanel',
        'ConferenceApp.view.main.NavigationTree'
    ],

    xtype: 'app-main',
    reference: 'main',
    cls: 'main-view',
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'appHeader',
        cls: 'app-header'
    }, {
        region: 'center',
        xtype: 'contentpanel',
        reference: 'contentPanel',
        cls: 'app-body'
    }, {
        xtype: 'navigationtree',
        region: 'west',
        stateful: true,
        stateId: 'mainnav.west',
        split: true,
        collapsible: true,
        collapsed: false,
        width: 250,
        minWidth: 100
    }],
    // listeners:{
    //     beforerender:'setAdminDetails'
    // }
});
