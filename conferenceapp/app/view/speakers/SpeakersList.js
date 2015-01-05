Ext.define('ConferenceApp.view.speakers.SpeakersList', {
    extend: 'Ext.container.Container',
    xtype: 'speakerslist',
    requires: [
    'ConferenceApp.store.Speakers'
    ],
    componentCls: 'speaker-body',
    controller: 'speaker',
    items: [{
        xtype: 'container',   
        cls: 'speakers-list-header',
        docked: 'top',
        layout: 'column',
        items: [{
            xtype: 'container',
            html: '<span class="speakers-list-header-title"><i class="fa fa-microphone"></i>Speaker List</span>',
            columnWidth: 0.7
        },{
            xtype: 'button',
            cls: 'speaker-add-btn',
            handler: 'addSpeaker',
            tooltip: 'Add speaker',
            columnWidth: 0.1,
            glyph: 0xf067       
        },{
            xtype: 'textfield',
            emptyText: 'Search speakers',
            name: 'search_speaker',
            inputWrapCls: 'search-speaker-input-wrapper',
            cls: 'search-input',
            columnWidth: 0.25,
            enableKeyEvents: true,
            listeners : {
                keyup : {
                    element: 'el',
                    fn : 'searchSpeakers'
                }
            }
        }]
    }, {
        xtype: 'dataview',
        store: 'Speakers',
        tpl: Templates.getSpeakersList(),
        // Match the li, since each one maps to a record
        itemSelector: 'li'
    }],

    listeners:{
        beforerender: function(){
            Ext.getStore("Speakers").load();
        }
    }
    
});
