Ext.define('ConferenceApp.view.agenda.AgendaList', {
    extend: 'Ext.container.Container',
    requires: ['ConferenceApp.view.agenda.AgendaViewController'],
    xtype: 'agendalist',
    cls: 'agenda-list-container',
    controller: 'agenda',


    items: [{
        xtype: 'container',
        cls: 'agenda-list-header',
        docked: 'top',
        layout: 'hbox',
        items: [{
            xtype: 'container',
            html: '<span class="agenda-list-header-title"><i class="fa fa-list"></i>Agenda List</span>',
            flex: 3,
            width: '80%'
        }, {
            xtype: 'button',
            cls: 'agenda-add-btn',
            handler: 'showAddAgendaWindow',
            tooltip: 'Add Agenda',
            glyph: 0xf067
        }, {
            xtype: 'textfield',
            emptyText: 'Search Agendas',
            name: 'search_agenda',
            inputWrapCls: 'search-agenda-input-wrapper',
            cls: 'search-agenda-input search-input',
            flex: 1,
            enableKeyEvents: true,
            listeners: {
                keyup: {
                    element: 'el',
                    fn: 'searchAgendas'
                }
            }
        }]
    }, {
        xtype: 'tabpanel',
        cls: 'agenda-list-tab-panel',
        reference: 'agendaTabPanel',
        name: 'agenda_tab_panel',
        border: false,
        listeners: {
            afterrender: 'populateAgendaPanels'
        }
    }]
});
