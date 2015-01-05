Ext.define('ConferenceApp.view.login.Login', {
    extend: 'Ext.container.Container',
    requires: [
        'ConferenceApp.view.login.LoginController',
        'Ext.form.Panel'
    ],
    controller: 'login',
    xtype: 'login',
    requires: [
        'ConferenceApp.view.login.LoginController'
    ],
    cls: 'login-page',
    plugins: 'viewport',
    layout: 'fit',
    controller: 'login',
    // height: '100%',
    items: [{
        cls:'texture',
        layout: {
            type: 'hbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [{
            flex: 2,
            cls: 'login-page-name',
            html: 'Conference App'
        }, {
            xtype: 'container',
            flex: 1,
            // cls: 'form-container',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'form',
                reference: 'loginForm',
                cls: 'login-form',
                width: '65%',
                frame: true,
                title: 'Login',
                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    cls: 'form-field',
                    name: 'email',
                    value: 'abhisek.kundu@innofied.com',
                    emptyText: 'User Name'
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    cls: 'form-field',
                    name: 'password',
                    value: 'jaja',
                    emptyText: 'Password',
                    inputType: 'password'
                }, {
                    xtype: 'checkbox',
                    fieldLabel: 'Remember Me',
                    name: 'remember',
                    cls: 'remember-me'
                }, {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [{
                        xtype: 'button',
                        scale: 'medium',
                        text: 'Login',
                        cls: 'login-btn',
                        handler: 'onLoginClick'
                    }]
                }, {
                    xtype: 'container',
                    cls: 'link-container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'stretch'
                    },
                    items: [{
                        xtype: 'box',
                        html: '<a class="forgot-password" href=""><i class="fa fa-lock"></i>Forgot Password</a>'
                    }]
                }]
            }]
        }]
    }]
});
