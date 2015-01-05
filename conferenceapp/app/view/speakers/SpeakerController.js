Ext.define('ConferenceApp.view.speakers.SpeakerController', {
    extend: 'Ext.app.ViewController',

    requires: [
    'Ext.MessageBox',
    'ConferenceApp.view.speakers.AddSpeaker'
    ],

    alias: 'controller.speaker',
    
    /*
     *  Search speakers  
     */
    searchSpeakers : function(input,e) {
        var inputVal = input.target.value,
        speakerStore = Ext.getStore('Speakers');
        
        // Clear the filter if no value is entered (or if the field is cleared)
        if(!inputVal.length) {
            speakerStore.clearFilter();
            return;
        }
        
        // Filter the store
        speakerStore.filter([{
            property: 'name',
            value: inputVal
        }]);
    },
    /*
     *   Open add speaker popup window
     */
    addSpeaker: function() {
        var addSpeakersWindow = this.lookupReference('addSpeakersWindow');

        if (!addSpeakersWindow) {
            addSpeakersWindow = new ConferenceApp.view.speakers.AddSpeaker();
            this.getView().add(addSpeakersWindow);
        }

        addSpeakersWindow.show();
    },
    /*
     *   Hide and reset the add speaker form
     */
    onAddSpeakerFormCancel : function() {
        
        this.lookupReference('addSpeakerForm').getForm().reset();
        this.lookupReference('addSpeakersWindow').hide();
    },
    /*
     *  Add speaker field in form
     */
    addSpeakerField: function(options) {
        var item = options.field.add([{
            xtype: 'textfield',
            emptyText: options.emptyText,
            columnWidth: 0.92,
            fieldLabel: ' ',
            labelSeparator: '',
            name: options.name,
            labelWidth: 100,
            cls: 'add-speaker-new-field'
        },{
            xtype: 'button',
            cls: 'speaker-add-btn add-speaker-new-field',
            handler: options.handler,
            tooltip: 'Delete',
            glyph: 0xf068,
            columnWidth: 0.1
        }]);
        
        // Increase the height of the item as its a vbox layout
        options.field.setHeight(options.field.getHeight() + 50 );
        
        // Stop the scolling by focusing on the 1st textfield
        item[0].focus();
    },
    /*
     *  Delete newly added field
     */
    deleteSpeakerField: function (field, fieldAction, btn) {
        // Decrease the height
        field.setHeight(field.getHeight() - 50 );
        
        // Stop the scolling by focusing on the 1st textfield
        field.down('textfield[action="' + fieldAction + '"]').focus();
        
        // Destroy the textfield and button
        btn.prev().destroy();
        btn.destroy();
    },
    /*
     *  Add speaker websites in form
     */
    addSpeakerWebsites: function() {
        var me = this;
        
        me.addSpeakerField({
            field : me.lookupReference('website_field'),
            emptyText : 'Enter websites',
            name: 'websites',
            handler : 'deleteSpeakerWebsiteField'
        });
    },
    /*
     *  Delete newly added website field
     */
    deleteSpeakerWebsiteField: function (btn) {
        
        this.deleteSpeakerField(this.lookupReference('website_field'),"website-field", btn);
    },
    /*
     *  Add speaker websites in form
     */
    addSpeakerBlogs: function() {
        var me = this;
        
        me.addSpeakerField({
            field : me.lookupReference('blog_field'),
            emptyText : 'Enter blogs',
            name: 'blogs',
            handler : 'deleteSpeakerBlogField'
        });
    },
    /*
     *  Delete newly added blog field
     */
    deleteSpeakerBlogField: function (btn) {
        this.deleteSpeakerField(this.lookupReference('blog_field'),"blog-field", btn);
    },
    /*
     *  Add speaker social in form
     */
    addSpeakerSocials: function() {
        var me = this;
        
        me.addSpeakerField({
            field : me.lookupReference('social_field'),
            emptyText : 'Enter social networks like fb, g+, linkedIn, etc',
            name: 'socials',
            handler : 'deleteSpeakerSocialField'
        });
    },
    /*
     *  Delete newly added social field
     */
    deleteSpeakerSocialField: function (btn) {
        this.deleteSpeakerField(this.lookupReference('social_field'),"social-field", btn);
    },
    /*
     *   Add the speaker and show the new speaker on list
     */
    onAddSpeakerFormSubmit: function() {
        var addSpeakersForm = this.lookupReference('addSpeakerForm');
        
        console.log('Form data = ', addSpeakersForm.getValues());
     
    }
});
