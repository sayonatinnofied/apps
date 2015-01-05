Ext.define('ConferenceApp.view.speakers.AddSpeaker', {
    extend: 'Ext.window.Window',
    xtype: 'addspeakers',
    
    reference: 'addSpeakersWindow',
    title: 'Add New Speaker',
    width: 600,
    minWidth: 400,
    maxHeight: 500,
    minHeight: 380,
    layout: 'fit',
    resizable: true,
    maximizable: true,
    //    defaultFocus: 'name',
    closeAction: 'hide',
    modal: true,
    constrainHeader: true,    // Prevent window to fall outside its containing element

    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        overflowY: 'auto',
        //        autoScroll: true,
        reference: 'addSpeakerForm',

        fieldDefaults: {
            msgTarget: 'side',
            labelAlign: 'right',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            allowOnlyWhitespace: false,
            labelPad: 15
        //            anchor: '100%',
        //            height: 50
        },
        
        defaults: {
            cls: 'add-speaker-form-item',
            height: 70
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
            name: 'name',
            labelSeparator: '<span style="color:red"> *</span>',
            emptyText: 'Enter name',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Company Name',
            name: 'companyName',
            emptyText: 'Enter name',
            labelSeparator: '<span style="color:red"> *</span>',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Designation',
            name: 'designation',
            emptyText: 'Enter designation',
            labelSeparator: '<span style="color:red"> *</span>',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email',
            vtype: 'email',
            emptyText: 'Enter email',
            labelSeparator: '<span style="color:red"> *</span>',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Address',
            emptyText: 'Enter address',
            name: 'speaker_address'
        }, {
            layout: 'column',
            defaults: {
                height: 35
            },
            
            items: [{
                xtype: 'textfield',
                emptyText: 'City',
                fieldLabel: 'Location',
                columnWidth: 0.45,
                margin: '0 10 0 0',
                name: 'city'
            },{
                xtype: 'textfield',
                emptyText: 'State',
                columnWidth: 0.3,
                margin: '0 10 0 0',
                name: 'state' 
            },{
                xtype: 'textfield',
                emptyText: 'Country',
                columnWidth: 0.25,
                name: 'country' 
            }]
        }, {
            layout: 'column',
            reference: 'website_field',
            defaults: {
                height: 35
            },
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Websites',
                emptyText: 'Enter websites',
                name: 'websites',
                action: 'website-field',
                margin: '0 15 0 0',
                columnWidth: 0.92
            },{
                xtype: 'button',
                cls: 'speaker-add-btn',
                handler: 'addSpeakerWebsites',
                tooltip: 'Add Website',
                glyph: 0xf067,
                columnWidth: 0.1
                
            }]
        }, {
            layout: 'column',
            reference: 'blog_field',
            defaults: {
                height: 35
            },
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Blogs',
                emptyText: 'Enter blogs',
                name: 'blogs',
                action: 'blog-field',
                margin: '0 15 0 0',
                columnWidth: 0.92
            },{
                xtype: 'button',
                cls: 'speaker-add-btn',
                handler: 'addSpeakerBlogs',
                tooltip: 'Add Website',
                glyph: 0xf067,
                columnWidth: 0.1
            }]
        }, {
            layout: 'column',
            reference: 'social_field',
            defaults: {
                height: 35
            },
            
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Social Networks',
                emptyText: 'Enter social networks like fb, g+, linkedIn, etc',
                name: 'socials',
                action: 'social-field',
                margin: '0 15 0 0',
                columnWidth: 0.72
            },{
                xtype: 'combo',
                columnWidth: 0.2,
                valueField: 'value',
                name: 'social_key',
                editable: false,
                value: 'fb',
                margin: '0 15 0 0',
                store: {
                    fields: ['text', 'value'],
                    data : [{
                        text: 'Facebook',
                        value: 'fb'
                    },{
                        text: 'Twitter',
                        value: 'tw'
                    },{
                        text: 'LinkedIn',
                        value: 'ln'
                    },{
                        text: 'Google+',
                        value: 'g+'
                    }]
                }
            },{
                xtype: 'button',
                cls: 'speaker-add-btn',
                handler: 'addSpeakerSocials',
                tooltip: 'Add Social',
                glyph: 0xf067,
                columnWidth: 0.1
            }]
        }, {
            xtype: 'textareafield',
            fieldLabel: 'Biography',
            emptyText: 'Enter biography',
            name: 'bio',
            grow: true,
            height: 90
        }],

        buttons: [{
            text: 'Cancel',
            handler: 'onAddSpeakerFormCancel'
        }, {
            text: 'Save',
            handler: 'onAddSpeakerFormSubmit'
        }]
    }]
});
