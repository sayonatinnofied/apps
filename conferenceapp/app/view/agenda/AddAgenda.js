Ext.define('ConferenceApp.view.agenda.AddAgenda', {
    extend: 'Ext.window.Window',
    requires: [
        'ConferenceApp.view.agenda.AgendaViewController',
        'ConferenceApp.view.event.CustomVType'
    ],
    xtype: 'addagenda',
    reference: 'addAgendaWindow',
    title: 'Add Agenda',
    cls: 'add-agenda-form-container',

    width: 600,
    minWidth: 400,
    // height:'100%',
    // minHeight: 400,
    // overflowY:'scroll',
    resizable: true,
    layout:'fit',
    maximizable:true,

    items: [{
        xtype: 'form',
        reference: 'addAgendaForm',
        cls: 'add-agenda-form',
        autoScroll:true,

        fieldDefaults: {
            msgTarget: 'side',
            allowBlank: false,
            labelAlign: 'left',
            labelWidth: 100,
            labelStyle: 'font-weight:bold',
            anchor: '100%',
            cls:'add-agenda-form-item'
        },

        items: [{
            xtype: 'textfield',
            fieldLabel: 'Title',
            name: 'agenda_title',
            emptyText: 'Title',
            labelSeparator: '<span class="label-separator"> *</span>'

        }, {
            xtype: 'textareafield',
            name: 'agenda_description',
            allowBlank: true,
            fieldLabel: 'Description',
            emptyText: 'Enter text here...',
            height: 100,
            grow: true,
            labelSeparator: ' '

        }, {
            xtype: 'textfield',
            fieldLabel: 'Location',
            name: 'agenda_location',
            emptyText: 'Location',
            labelSeparator: '<span class="label-separator"> *</span>'

        }, {
            xtype: 'combo',
            store: 'Speakers',
            queryMode: 'local',
            multiSelect: true,
            valueField: '_id',
            delimiter: ',',
            tpl: Templates.getSpeakerComboBoxOptions(),
            displayTpl: Templates.getSpeakerComboBoxDisplay(),
            fieldLabel: 'Speaker',
            name: 'agenda_speaker',
            emptyText: 'Choose one or more speakers...',
            labelSeparator: '<span class="label-separator"> *</span>'

        }, {
            layout: 'hbox',

            items: [{
                xtype: 'datefield',
                cls: 'agendaDate',
                itemId:'start_date',
                labelSeparator: '<span class="label-separator"> *</span>',
                fieldLabel: 'Start',
                name: 'starting_date',
                vtype: 'agendaDateRange',
                endDateField: 'end_date',
                flex: 1

            }, {
                xtype: 'timefield',
                cls: 'agendaTime',
                flex: 1,
                name: 'starting_time',
                fieldLabel: '',
                minValue: '6:00 AM',
                maxValue: '8:00 PM',
                increment: 5,

            }]
        }, {
            layout: 'hbox',

            items: [{
                xtype: 'datefield',
                cls: 'agendaDate',
                itemId:'end_date',
                labelSeparator: '<span class="label-separator"> *</span>',
                fieldLabel: 'End',
                name: 'ending_date',
                vtype: 'agendaDateRange',
                startDateField: 'start_date',
                flex: 1

            }, {
                xtype: 'timefield',
                cls: 'agendaTime',
                flex: 1,
                name: 'ending_time',
                fieldLabel: '',
                minValue: '6:00 AM',
                maxValue: '8:00 PM',
                increment: 5

            }]
        }],

        buttonAlign: 'center',
        buttons: [{
            text: 'Submit',
            scale: 'medium',
            handler: 'onAddAgendaFormSubmit'
        }, {
            text: 'Cancel',
            scale: 'medium',
            handler: 'onAddAgendaFormCancel'
        }]
    }],

});
