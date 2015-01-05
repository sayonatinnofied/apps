Ext.define('ConferenceApp.controller.App', {
    extend: 'Ext.app.Controller',
    util: ConferenceApp.util.Util,
    requires: [
        'ConferenceApp.view.*',
        'Ext.window.*'
    ],

    stores: [
        'Navigation'
    ],

    config: {

        refs: {
            navigationTree: 'navigationtree',
            contentPanel: 'contentpanel',
            loginBtn: 'button[name="login_btn"]',
            appMain: 'app-main',
            login: 'login'
        },
        control: {
            'navigationtree': {
                selectionchange: 'onTreeNavSelectionChange'
            }
        },
        routes: {
            ':view': {
                action: 'loginRoute',
                before: 'beforeLoginRoute'
            },
            ':view/:id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },

    beforeLoginRoute: function(view, action) {
        if (view !== 'login') {
            var me = this,
                node = Ext.getStore('Navigation').getNodeById(view);
            if (node) {
                //resume action
                action.resume();
            } else {
                Ext.Msg.alert(
                    'Route Failure',
                    'The view for ' + id + ' could not be found. You will be taken to the application\'s start',
                    function() {
                        if (localStorage.getItem('AdminDetails')) {
                            me.redirectTo('event/eventdetails');
                        } else {
                            me.redirectTo('login');
                        }
                    }
                );

                //stop action
                action.stop();
            }
        } else {
            action.resume();
        }
    },

    loginRoute: function(view) {

        var me = this;

        if (view === 'login') {
            if (localStorage.getItem('AdminDetails')) {
                window.history.forward();
            } else {
                if (!me.getLogin()) {
                    if (me.getAppMain()) {
                        me.getAppMain().destroy();
                    }
                    Ext.widget('login');
                }
            }
        } else {
            me.handleRoute(view);
        }
    },

    onTreeNavSelectionChange: function(selModel, records) {
        var me = this,
            record = records[0],
            parent = record.parentNode.getId();

        if (record) {
            if (parent === 'root') {
                me.redirectTo(record.getId());
            } else {
                me.redirectTo(parent + '/' + record.getId());
            }
        }
    },

    beforeHandleRoute: function(view, id, action) {
        var me = this,
            node = Ext.getStore('Navigation').getNodeById(id);

        if (node) {
            //resume action
            action.resume();
        } else {
            Ext.Msg.alert(
                'Route Failure',
                'The view for ' + id + ' could not be found. You will be taken to the application\'s start',
                function() {
                    if (localStorage.getItem('AdminDetails')) {
                        me.redirectTo('event/eventdetails');
                    } else {
                        // me.getAppMain().destroy();
                        me.redirectTo('login');
                    }
                }
            );

            //stop action
            action.stop();
        }
    },


    handleRoute: function(view, id) {
        var me = this;

        if (!localStorage.getItem('AdminDetails')) {
            Ext.Msg.alert(
                'Unauthorized Access',
                'You are not Logged in. Please log in',
                function() {
                    // me.getAppMain().destroy();
                    me.redirectTo('login');
                }
            )
            return;
        }

        id = id ? id : view;

        var navigationTree = me.getNavigationTree(),
            store = Ext.getStore('Navigation'),
            node = store.getNodeById(id),
            contentPanel = me.getContentPanel(),
            cmp, className, ViewClass, main;

        if (node.isLeaf()) {

            contentPanel.removeAll(true);
            className = Ext.ClassManager.getNameByAlias('widget.' + id);
            ViewClass = Ext.ClassManager.get(className);

            cmp = new ViewClass();
            contentPanel.add(cmp);

            navigationTree.getSelectionModel().select([node]);
        }

    }
});
