Ext.define('ConferenceApp.view.event.Sponsors', {
    extend: 'Ext.panel.Panel',
    xtype: 'sponsors',
    requires: [
        'Ext.layout.container.Table',
        'ConferenceApp.store.Sponsors'
    ],
    controller: 'eventviewcontroller',
    defaults: {
        //bodyPadding: 10
    },
    // title: 'Sponsors',
    bodyCls: 'sponsors-body',

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
                html: '<span class="speakers-list-header-title"><i class="fa fa-user sponsor-icon"></i>Sponsors</span>',
                flex: 3,
                width: '80%'
            }, {
                xtype: 'button',
                cls: 'speaker-add-btn',
                handler: 'showAddSponsorWindow',
                tooltip: 'Add speaker',
                glyph: 0xf067
            }, {
                xtype: 'textfield',
                emptyText: 'Search Sponsors',
                name: 'search_sponsor',
                inputWrapCls: 'search-speaker-input-wrapper',
                cls: 'search-input',
                flex: 1,
                enableKeyEvents: true,
                listeners: {
                    keyup: {
                        element: 'el',
                        fn: 'searchSponsors'
                    }
                }
            }]
        }, {
            xtype: 'dataview',
            padding:10,
            reference: 'sponsorsDataview',
            store: 'Sponsors',
            tpl: Templates.getSponsorsList(),
            itemSelector: 'li.thumb-wrap',
            emptyText: 'No Sponsors available',
            listeners:{
                itemClick:'sponsorItemTap'
            }
        }];

        me.callParent();
    }
});
