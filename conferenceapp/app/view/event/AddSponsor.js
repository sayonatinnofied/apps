Ext.define('ConferenceApp.view.event.AddSponsor', {
    extend: 'Ext.window.Window',
    xtype: 'addsponsor',

    reference: 'addSponsorWindow',
    title: 'Add New Sponsor',
    cls: 'sponsor-window',
    // cls: 'add-agenda-form-container',
    width: 650,
    minWidth: 400,
    maxHeight: 500,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    // modal: true,
    maximizable: true,
    defaultFocus: 'brand_name',
    closeAction: 'hide',

    items: [{
        xtype: 'form',
        autoScroll: true,
        reference: 'addSponsorForm',
        cls: 'add-agenda-form',
        border: false,
        bodyPadding: 10,

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 100,
            labelStyle: 'font-weight:bold;padding-right:10px',
            anchor: '100%',
            cls: 'add-agenda-form-item'
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Brand Name',
            name: 'brand_name',
            vtype: 'alpha',
            allowBlank: false,
            labelSeparator: ': <span style="color:red">*</span>'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Choose Sponsorship Category',
            name: 'category_id',
            store: {
                type: 'sponsorshipcategories'
            },
            labelSeparator: ': <span style="color:red">*</span>',
            valueField: '_id',
            displayField: 'name',
            typeAhead: true,
            queryMode: 'local',
            emptyText: 'Select a Sponsorship Category...'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Website',
            vtype: 'url',
            name: 'website',
            labelSeparator: ': <span style="color:red">*</span>',
            allowBlank: false
        }, {
            xtype: 'fieldcontainer',
            flex: 1,
            fieldLabel: 'Sponsor Logo',
            layout: 'hbox',
            defaults: {
                hideLabel: true
            },
            items: [{
                xtype: 'displayfield',
                reference: 'sponsorProfileImageDisplayield',
                cls: 'cover-photo-file-item'
            }, {
                xtype: 'filefield',
                buttonConfig: {
                    text: 'Choose'
                },
                vtype: 'imageFile',
                listeners: {
                    change: 'sponsorProfileImageChange'
                },
                reference: 'sponsorProfileImage',
                name: 'sponsorLogo'
            }]
        }, {
            xtype: 'textareafield',
            name: 'description',
            cls: 'sponsor-text-area-field',
            fieldLabel: 'Description',
            labelAlign: 'top',
            flex: 1,
            margin: '0',
            labelSeparator: ': <span style="color:red">*</span>',
            allowBlank: false
        }, {
            xtype: 'fieldset',
            title: 'Social',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
                vtype: 'url'
            },

            items: [{
                // allowBlank: false,
                fieldLabel: 'LinkedIn',
                name: 'linkedin'
            }, {
                // allowBlank: false,
                fieldLabel: 'Twitter',
                name: 'twitter'
            }, {
                allowBlank: false,
                fieldLabel: 'Google+',
                name: 'google',
                labelSeparator: ':<span style="color:red">*</span>',
                vtype: 'email'
            }, {
                // allowBlank: false,
                fieldLabel: 'Facebook',
                name: 'facebook'
            }]
        }],

        buttons: [{
            text: 'Cancel',
            handler: 'onAddSponsorFormCancel'
        }, {
            text: 'Save',
            handler: 'onAddSponsorFormSubmit'
        }]
    }]
});
