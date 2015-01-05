Ext.define('ConferenceApp.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    util: ConferenceApp.util.Util,

    onLoginClick: function() {
        var me = this,
            form = me.lookupReference('loginForm'),
            rememberMe = form.getValues().remember,
            adminDetails = {};

        // This would be the ideal location to verify the user's credentials via 
        // a server-side lookup. We'll just move forward for the sake of this example.
        // Set the localStorage value to true
        form.submit({
            url: me.util.api.login,
            method: 'POST',
            success: function(form, action) {
                // console.log(action.result.data);
                var adminData = action.result.data;

                if (adminData) {
                    adminDetails.adminId = adminData._id;
                    adminDetails.eventId = adminData.userEvent;
                    adminDetails.name = adminData.name;
                    adminDetails.email = adminData.email;
                    localStorage.setItem("AdminDetails", JSON.stringify(adminDetails));
                }

                if (rememberMe === 'on') {
                    localStorage.setItem("LoggedInCredentials", true);
                }

                me.getView().removeCls('login-page');
                me.getView().destroy();

                Ext.widget('app-main');
                me.redirectTo('event/eventdetails');

            },

            failure: function(form, action) {
                console.log(action);
                Ext.Msg.alert('Error', 'Connection Error. Server not found.');
            }
        });
    }
});
