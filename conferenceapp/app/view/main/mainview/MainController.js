/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('ConferenceApp.view.main.mainview.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox'
    ],
    util: ConferenceApp.util.Util,

    alias: 'controller.main',

    // setAdminDetails: function() {
    //     var me = this,
    //         adminDetails = Ext.decode(localStorage.getItem("AdminDetails"));

    //     if (adminDetails) {
    //         me.getViewModel().setData(adminDetails);
    //     }
    //     console.log(me.getViewModel());
    // },

    logOut: function() {
        var me = this,
            email = me.getViewModel().getData().email;
        Ext.Ajax.request({
            url: me.util.api.logout,
            params: {
                email: me.util.api.adminEmail
            },
            success: function(response) {
                Ext.MessageBox.alert(
                    'Success', 'Logged Out.Please Log In to continue'
                );

                localStorage.removeItem('LoggedInCredentials');
                localStorage.removeItem('AdminDetails');
                me.getView().destroy();
                
                me.redirectTo('login');

                // localStorage.removeItem('LoggedInCredentials');
                // localStorage.removeItem('AdminDetails');
                // me.getView().destroy();
                // window.location.hash = "login";
                // // Ext.widget('login');

            }
        })
    }
});
