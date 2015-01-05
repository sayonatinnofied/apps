/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'StorageDemo',

    requires: [
        'Ext.MessageBox',
        'StorageDemo.util.Util'
    ],

    views: [
        'Main',
        'LogIn',
        'VideosLists',
        'WishList'
    ],

    stores: [
        'Videos',
        'Wishes',
        'LogInLocal',
        'LogInSession'
    ],

    models: [
        'Video',
        'LogInCredential'
    ],

    controllers: [
        'App'
    ],

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var loginLocalStoreData = Ext.getStore('LogInLocal').getData(),
            loginSessionStore = Ext.getStore('LogInSession'),
            main = Ext.create('StorageDemo.view.Main'),
            localStore,
            login = {};

        // checks if there is already a record in local storage
        // if so, no need for username and password
        // user is directly logged in

        if (loginLocalStoreData.length) {
            var videosLists = Ext.create('StorageDemo.view.VideosLists');

            // VideosLists is set as first view
            main.setActiveItem(videosLists);

            // Fetching loginlocalstore data
            localStore = loginLocalStoreData.items[0].data;
            login.username = localStore.username;
            login.password = localStore.password;

            // Adding the loginlocalstore data into loginsessionstore
            loginSessionStore.add(login);
        }

        // Initialize the main view
        Ext.Viewport.add(main);

        // Resetting the loginsessionstore
        loginSessionStore.removeAll();

    }
});
