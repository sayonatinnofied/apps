Ext.define('ConferenceApp.view.agenda.AgendaViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.agenda',

    /*
     * Agenda panels are populated after agenda tabpanel is rendered.
     */
    populateAgendaPanels: function() {
        var me = this,
            loadingMask = new Ext.LoadMask({
                msg: 'Loading...',
                target: me.getView()
            });

        loadingMask.show();

        Ext.getStore("Agendas").load(function(records, operation, successful) {
            if (!successful) {
                Ext.Msg.alert('Connection Error', 'Server not found');
            } else {
                me.createAgendaPanels();
            }
            loadingMask.hide();
        })
    },

    /*
     * Creating Panels dynamically for indivisual agenda date as provided by api
     * and adding them to the tabpanel
     */
    createAgendaPanels: function() {

        var store = Ext.getStore('Agendas'),
            panelConfigs = this.getPanelConfigs(),
            tabPanel = this.lookupReference('agendaTabPanel'),
            storeGroups = store.getGroups(),
            agendaDateCount = storeGroups.length,
            currentGroup,
            panel;

        tabPanel.removeAll();

        for (var i = 0; i < agendaDateCount; i++) {

            currentGroup = storeGroups.items[i];

            for (var j = 0; j < currentGroup.length; j++) {
                panelConfigs.items[1].data.push(currentGroup.items[j].data);
            }

            panelConfigs.items[0].data = {
                agendaDay: currentGroup.items[0].data.agendaDay
            };

            panel = Ext.create('Ext.panel.Panel', panelConfigs);
            panel.setTitle(currentGroup.items[0].data.agendaDate);

            tabPanel.add(panel);

            panelConfigs.items[1].data = [];
        }

        tabPanel.setActiveTab(0);
    },


    /*
     * return configs for each panel
     */
    getPanelConfigs: function() {
        return {

            items: [{
                xtype: 'container',

                tpl: Templates.getAgendaDateField()
            }, {
                xtype: 'container',

                tpl: Templates.getAgendaList(),

                data: []

            }]
        };
    },


    /*
     *  Preparing parameters for add-agenda api call
     */
    onAddAgendaFormSubmit: function() {
        var agendaAdditionForm = tabPanel = this.lookupReference('addAgendaForm'),
            form = agendaAdditionForm.getForm(),
            formData,
            startingDate,
            endingDate,
            me = this;

        if (form.isValid()) {
            console.log(form.getValues());

            formData = form.getValues();
            startingDate = me.getModifiedDate(formData.starting_date, formData.starting_time);
            endingDate = me.getModifiedDate(formData.ending_date, formData.ending_time);

            me.submitAgendaDetails(formData, startingDate, endingDate);
        } else {
            console.log("error");
        }
    },

    /*
     *  Setting the time of date argument with the help of time argument
     */
    getModifiedDate: function(date, time) {
        var mergedDate = new Date(date),
            hour = Number(time.slice(0, time.indexOf(':')));

        //Value of time parameter:- 09:20 AM, 12:30 PM etc. 
        if (time.indexOf('P') >= 0) {
            mergedDate.setHours(hour + 12);
        } else {
            mergedDate.setHours(hour);
        }

        mergedDate.setMinutes(Number(time.substr(time.indexOf(':') + 1, 2)));

        return mergedDate;
    },

    /*
     *  Submit new agenda details to the server
     */
    submitAgendaDetails: function(formData, startingDate, endingDate) {
        var me = this;

        Ext.Ajax.request({
            url: 'http://192.168.2.6:8000/api/agenda/add-agenda',
            method: 'POST',

            jsonData: {
                adminId: '53db417f6d8c0afb2d4986d1',
                speakers: formData.agenda_speaker,
                eventId: '53db417f6d8c0afb2d4986d2',
                title: formData.agenda_title,
                location: formData.agenda_location,
                description: formData.agenda_description,
                dateSpan: {
                    from: startingDate.toISOString(),
                    to: endingDate.toISOString()
                }
            },
            success: function(response) {
                var text = response.responseText;
                console.log(text);
                Ext.MessageBox.alert(
                    'Success', 'Agenda Added!'
                );

                Ext.getStore('Agendas').load();
                me.lookupReference('addAgendaForm').getForm().reset();
                me.createAgendaPanels();

            },
            failure: function(response) {
                var text = response.responseText;
                console.log(text);

                Ext.MessageBox.alert(
                    'Failed', 'Agenda Addition Failed'
                );
            }
        });
    },

    /*
     *  Open a new window containing add-agenda form
     */
    showAddAgendaWindow: function() {
        var me = this,
            addAgendaWindow = me.lookupReference('addAgendaWindow');

        if (!addAgendaWindow) {
            addAgendaWindow = new ConferenceApp.view.agenda.AddAgenda();
            me.getView().add(addAgendaWindow);
        }

        addAgendaWindow.show();
    },

    /*
     *  Close the window containing add-agenda form
     */
    onAddAgendaFormCancel: function() {
        var me = this;

        me.lookupReference('addAgendaForm').getForm().reset();
        me.lookupReference('addAgendaWindow').hide();
    },

    /*
     * Sets filter to the agenda store according to searched agenda-title
     * and regenerates agenda tab panels
     */
    searchAgendas: function(input) {
        var inputVal = input.target.value,
            agendaStore = Ext.getStore('Agendas');

        // Clear the filter if no value is entered or entered value contains 
        // spaces only (or if the field is cleared)

        if (!inputVal.trim().length) {
            agendaStore.clearFilter();

        } else { // Filter the store
            agendaStore.filter([{
                property: 'title',
                value: inputVal
            }]);
        }

        this.createAgendaPanels();
    }

});
