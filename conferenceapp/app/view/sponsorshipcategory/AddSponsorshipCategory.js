Ext.define('ConferenceApp.view.sponsorshipcategory.AddSponsorshipCategory', {
    extend: 'Ext.window.Window',
    xtype: 'addsponsorshipcategory',
    controller: 'sponsorshipcategorycontroller',
    reference: 'addsponsorshipcategorywindow',
    title: 'Add New Sponsorship Category',
    layout: 'fit',
    width: 350,
    height: 250,
    layout: 'fit',
    resizable: true,
    maximizable: true,
    closeAction: 'hide',

    items: [{
        xtype: 'form',
        reference: 'addSponsorshipCatgeoryForm',
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'top',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            anchor: '100%'
        },
        items: [{
            xtype: 'textfield',
            name: 'title',
            //vtype: 'alpha',
            cls: 'add-form-title',
            fieldLabel: 'Title',
            allowBlank: false
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            combineErrors: true,
            cls: 'add-form-amount',
            msgTarget: 'side',
            fieldLabel: 'Amount',
            defaults: {
                hideLabel: true
            },
            items: [{
                //the width of this field in the HBox layout is set directly
                //the other 2 items are given flex: 1, so will share the rest of the space
                width: 75,
                xtype: 'combo',
                queryMode: 'local',
                cls: 'add-form-currency',
                value: '₹',
                triggerAction: 'all',
                forceSelection: true,
                editable: false,
                fieldLabel: 'Currency',
                name: 'currency',
                displayField: 'name',
                valueField: 'value',
                store: {
                    fields: ['name', 'value'],
                    data: [{
                        name: '₹',
                        value: '₹'
                    }, {
                        name: '$',
                        value: '$'
                    }]
                }
            }, {
                xtype: 'textfield',
                name: 'price',
                cls: 'add-form-price',
                fieldLabel: 'Price',
                allowBlank: false
            }]
        }],
        buttons: [{
            text: 'Submit',
            handler: 'onSubmitButtonClick'
        }, {
            text: 'Reset',
            handler: 'onResetButtonClick'
        }]
    }]
});
