Ext.define('ConferenceApp.view.event.FloorPlan', {
    extend: 'Ext.Container',
    xtype: 'floorplan',
    defaults: {
        bodyPadding: 10
    },

    initComponent: function() {
        var me = this;
        me.bodyStyle = 'background: transparent';

        me.items = [{
            xtype: 'container',
            cls: 'speakers-list-header',
            docked: 'top',
            layout: 'hbox',
            items: [{
                xtype: 'container',
                html: '<span class="speakers-list-header-title"><i class="fa fa-list sponsor-icon"></i>Floor Plan</span>',
                flex: 3,
                width: '80%'
            }, {
                xtype: 'button',
                cls: 'edit-event-btn',
                tooltip: 'Change Floor Plan Image',
                glyph: 0xf044,
                text:'Change Floor Plan Image'
            }]
        },{
            columnWidth: 1,
            cls: 'floor-plan-panel',
            bind: {
                html: '<img class="floor-plan-image" src="{floorPlanImage}"></img>'
            }
        }];

        me.callParent();
    }
});
