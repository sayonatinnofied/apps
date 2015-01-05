Ext.define('ConferenceApp.view.event.EventDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'eventdetails',
    cls: 'event-details',
    requires: [
        'ConferenceApp.view.event.EventViewModel',
        'ConferenceApp.view.event.EventViewController',
        'ConferenceApp.view.event.CustomVType'
    ],
    controller: 'eventviewcontroller',
    defaults: {
        bodyPadding: 10
    },
    // title: 'Event Details',

    initComponent: function() {
        var me = this;

        me.bodyStyle = "background: transparent";

        me.items = [{
            xtype: 'container',
            cls: 'speakers-list-header',
            docked: 'top',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                html: '<span class="speakers-list-header-title"><i class="fa fa-calendar sponsor-icon"></i>Manage Event</span>',
                flex: 3,
                width: '80%'
            }, {
                xtype: 'button',
                cls: 'edit-event-btn',
                tooltip: 'Edit Event',
                glyph: 0xf044,
                reference: 'editCancelToggle',
                handler: 'editEvent',
            }]
        }, {
            xtype: 'form',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            disabledCls: 'event-form-details',
            reference: 'eventDetailsForm',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 115,
                msgTarget: 'side',
                disabledCls: 'event-form-details'
            },
            viewModel: {
                type: 'eventviewmodel'
            },
            // The fields
            defaultType: 'displayfield',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Event Name',
                name: 'event_name',
                bind: '{eventName}',
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Event Logo',
                layout: 'hbox',
                defaults: {
                    hideLabel: true
                },
                items: [{
                    xtype: 'displayfield',
                    reference: 'eventLogoDisplayField',
                    bind: {
                        html: '<img src="{eventLogo}" style="max-width:200px"></img>'
                    },
                    cls: 'cover-photo-file-item'
                }, {
                    xtype: 'filefield',
                    buttonConfig: {
                        text: 'Choose'
                    },
                    vtype: 'imageFile',
                    listeners: {
                        change: 'eventLogoChange'
                    },
                    reference: 'eventLogo',
                    name: 'eventLogo'
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Website',
                name: 'website',
                bind: '{website}'
                    // vtype: 'url'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Address',
                name: 'address',
                bind: '{location.fullAddress}'
            }, {
                // allowBlank: false,
                xtype: 'textfield',
                fieldLabel: 'Building Name',
                name: 'building_name',
                bind: '{location.buildingName}'
            }, {
                // allowBlank: false,
                xtype: 'textfield',
                fieldLabel: 'City',
                name: 'city',
                bind: '{location.city}'
            }, {
                // allowBlank: false,
                xtype: 'textfield',
                fieldLabel: 'State',
                name: 'state',
                bind: '{location.state}'
            }, {
                // allowBlank: false,
                xtype: 'textfield',
                fieldLabel: 'Country',
                name: 'country',
                bind: '{location.country}'
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Event Span',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Start',
                    margin: '0 5 0 0',
                    name: 'startdt',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    msgTarget: 'side',
                    bind: '{startdate}',
                    endDateField: 'enddt' // id of the end date field
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'End',
                    name: 'enddt',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    msgTarget: 'side',
                    bind: '{enddate}',
                    startDateField: 'startdt' // id of the start date field
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Cover Image',
                flex: 1,
                layout: 'hbox',
                defaults: {
                    hideLabel: true
                },
                items: [{
                    xtype: 'displayfield',
                    reference: 'coverImageDisplayField',
                    bind: {
                        html: '<img src="{coverImage}" style="max-width:200px"></img>'
                    },
                    cls: 'cover-photo-file-item'
                }, {
                    xtype: 'filefield',
                    buttonConfig: {
                        text: 'Choose'
                    },
                    vtype: 'imageFile',
                    listeners: {
                        change: 'eventCoverImageChange'
                    },
                    reference: 'eventCoverImage',
                    name: 'coverImage'
                }]
            }],
            buttons: [{
                text: 'Save',
                formbind: true,
                handler: 'onEditEventDetailsSubmit'
            }],
            listeners: {
                afterrender: 'populateEventDetails'
            }
        }];
        me.callParent();
    }
});
