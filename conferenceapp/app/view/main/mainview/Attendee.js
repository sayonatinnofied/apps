Ext.define('ConferenceApp.view.main.mainview.Attendee', {
    extend: 'Ext.panel.Panel',
    xtype: 'attendee',
    requires: [
        'ConferenceApp.view.event.EventViewModel',
        'ConferenceApp.view.event.EventViewController'
    ],
    //    title: 'Attendee',
    controller: 'eventviewcontroller',
    defaults: {
        //        bodyPadding: 10
    },

    initComponent: function() {

        this.bodyStyle = "background: transparent";

        this.items = [{
            xtype: 'container',
            cls: 'speakers-list-header',
            docked: 'top',
            layout: 'hbox',
            items: [{
                    xtype: 'container',
                    html: '<span class="speakers-list-header-title"><i class="fa fa-th-list"></i>Attendee List</span>',
                    flex: 1
                }, {
                    xtype: 'textfield',
                    name: 'search_speaker',
                    emptyText: 'Search',
                    //            inputWrapCls: 'search-speaker-input-wrapper',
                    //            cls: 'search-speaker-input',
                    width: 200
                }
                //            {
                //                xtype: 'tbspacer',
                //                width: 20
                //            },
                //            {
                //                xtype: 'combobox',
                //                typeAhead: true,
                //                width: 135,
                //                store : Ext.create('Ext.data.Store', {
                //                    fields: ['abbr', 'name'],
                //                    data: [{
                //                        "abbr":"all", 
                //                        "name":"All"
                //                    }, {
                //                        "abbr":"name", 
                //                        "name":"Name"
                //                    }, {
                //                        "abbr":"email", 
                //                        "name":"Email"
                //                    }, {
                //                        "abbr":"compname", 
                //                        "name":"Company Name"
                //                    }]
                //                }),
                //                displayField: 'name',
                //                valueField: 'abbr'
                //            }
            ]
        }, {
            xtype: 'grid',
            store: Ext.data.StoreManager.lookup('Attendee'),
            cls: 'sponsorship-category-list',
            groupField: 'Designation',
            columns: [{
                xtype: 'rownumberer',
                text: '#',
                width: 50
            }, {
                text: 'Name',
                dataIndex: 'name',
                flex: 2
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 2
            }, {
                text: 'Designation',
                dataIndex: 'designation',
                flex: 1
            }, {
                text: 'Company',
                dataIndex: 'companyName',
                flex: 3
            }]
        }];

        this.callParent();
    }
});
