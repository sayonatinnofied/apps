Ext.define('StorageDemo.controller.App', {
    extend: 'Ext.app.Controller',
    util: StorageDemo.util.Util,
    config: {
        refs: {
            // Views
            main: 'main',
            logIn: 'login',
            videosLists: 'videoslists',

            // Fields 
            userName: 'textfield[name="user_name"]',
            password: 'passwordfield[name="password"]',
            rememberMe: 'checkboxfield[name="remember_me"]',

            // Buttons
            loginButton: 'button[name="login_btn"]',
            addButton: 'button[name="add_btn"]',
            backButton: 'button[name="back_btn"]',
            logOffButton: 'button[name="log_off"]',

            // Lists
            videosList: 'list[name="videos_list"]',
            wishList: 'wishlist'
        },
        control: {
            loginButton: {
                tap: 'gotoProfile'
            },
            addButton: {
                tap: 'addVideosToWishList'
            },
            backButton: {
                tap: 'gotoVideosList'
            },
            videosLists: {
                activate: 'loadListData'
            },
            logOffButton: {
                tap: 'logOutOfAccount'
            }
        }
    },


    /*
     * On successful logIn Profile is opened
     */

    gotoProfile: function() {
        var me = this,
            login = {};
        login.username = me.getUserName().getValue();
        login.password = me.getPassword().getValue();

        // Generally this checking is done in the server side but here we will
        // not complicate things by doing so.

        if (login.username === 'sencha' && login.password === 'sencha') {

            var logInSessionStore = Ext.getStore('LogInSession');

            if (me.getRememberMe().isChecked()) {
                // localstorage
                Ext.getStore('LogInLocal').add(login);
                //logInSessionStore.removeAll();
            }
            // sessionstorage
            logInSessionStore.add(login);
            
            // VideosLists View will be opened
            me.util.setActiveView(me, me.getVideosLists(), 'right');

        } else {
            Ext.Msg.alert('Error', 'Incorrect Username or Password', Ext.emptyFn);
        }
    },

    /*
     * VideosList is populated
     */
    loadListData: function() {
        var me = this;
        me.getVideosList().mask({
            xtype: 'loadmask'
        });
        Ext.Ajax.request({
            url: me.util.api.searchUrl,
            method: 'GET',
            useDefaultXhrHeader: false,
            params: {
                part: 'snippet',
                q: 'ambarsariya',
                regionCode: 'IN',
                maxResults: 30,
                key: me.util.api.key,
                pageToken:''
            },

            success: function(response, request) {
                var data = Ext.decode(response.responseText);
                console.log(data);
                Ext.getStore('Videos').setData(data.items);
                Ext.getStore('PageToken').setData(data);
                me.getVideosList().unmask();
            },

            failure: function(response) {
                me.util.failedRequest(response.statusText);
            }
        });
        var data=Ext.getStore('Videos').getData();
        console.log(data);
    },

    /*
     * Videos are added to WishList
     */
    addVideosToWishList: function() {
        var me = this,
            selectedVideos = me.getVideosList().getSelection();

        me.util.setActiveView(me, me.getWishList(), 'left');
        // localstorage
        Ext.getStore('Wishes').add(selectedVideos);

        me.getVideosList().deselectAll();
    },

    /*
     * VideosList view is opened
     */
    gotoVideosList: function() {
        var me = this;
        me.util.setActiveView(me, me.getVideosLists(), 'right');
    },

    /*
     * Log Out
     */
    logOutOfAccount: function() {
        var me = this;
        me.util.setActiveView(me, me.getLogIn(), 'right');

        Ext.getStore('LogInLocal').removeAll();
        Ext.getStore('LogInSession').removeAll();
    }
});
