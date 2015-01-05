Ext.define('ConferenceApp.view.event.EventViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.eventviewcontroller',
    requires: ['ConferenceApp.view.event.AddSponsor'],
    util: ConferenceApp.util.Util,


    /**************************** Event Details View ***************************/

    /*
     * Event Details view is populated after render
     */
    populateEventDetails: function() {
        var me = this,
            loadingMask = new Ext.LoadMask({
                msg: 'Loading...',
                target: me.getView()
            }),
            eventData,
            url = me.util.api.eventDetailsUrl + Ext.decode(localStorage.getItem('AdminDetails')).eventId,
            eventDataStore = Ext.getStore('Events'),
            eventDataStoreProxy = eventDataStore.getProxy(),
            eventViewModel,
            editCancelToggle = me.lookupReference('editCancelToggle'),
            form = me.lookupReference('eventDetailsForm');

        eventDataStoreProxy.setUrl(url);
        loadingMask.show();
        eventDataStore.load(function(records, operation, successful) {

            if (!successful) {
                Ext.Msg.alert('Connection Error', 'Server not found');
            } else {
                var response = Ext.decode(operation.getResponse().responseText);
                if (!response.success) {
                    console.log(response.errfor);
                    Ext.Msg.alert('Failed', 'Invalid Request');
                    return;
                }
                eventViewModel = form.getViewModel();
                eventData = eventDataStore.getAt(0).data;
                eventViewModel.setData(eventData);
                me.getViewModel().setData(eventData);
                form.disable();
            }
            loadingMask.hide();
        });

        editCancelToggle.setText('Edit Event');
    },

    editEvent: function(button) {
        var me = this,
            form = me.lookupReference('eventDetailsForm');

        if (button.getText() === 'Edit Event') {
            button.setText('Cancel Edit');
            form.enable();
        } else {
            me.populateEventDetails();
        }
    },

    eventLogoChange: function(view, value) {
        var me = this,
            eventData = me.lookupReference('eventDetailsForm').getViewModel().getData(),
            eventLogoDisplayField = me.lookupReference('eventLogoDisplayField'),
            file = view.fileInputEl.dom.files[0],
            fileConfig = {
                file: file,
                modelData: eventData,
                fieldName: 'eventLogo',
                displayField: eventLogoDisplayField
            };

        me.util.readImage(fileConfig, view, false);
    },

    eventCoverImageChange: function(view, value) {
        var me = this,
            displayField,
            eventData = me.lookupReference('eventDetailsForm').getViewModel().getData(),
            coverImageDisplayField = me.lookupReference('coverImageDisplayField'),
            file = view.fileInputEl.dom.files[0],

            fileConfig = {
                file: file,
                modelData: eventData,
                fieldName: 'coverImage',
                displayField: coverImageDisplayField
            };

        me.util.readImage(fileConfig, view, true);
    },

    onEditEventDetailsSubmit: function() {
        var me = this,
            formData,
            currentEventData,
            dateSpan = {},
            form = me.lookupReference('eventDetailsForm'),
            coverImage,
            formDataConfig = [],
            brandLogo;

        if (form.isValid()) {
            currentEventData = form.getViewModel().getData();
            dateSpan.from = currentEventData.startdate;
            dateSpan.to = currentEventData.enddate;
            currentEventData.dateSpan = dateSpan;
            coverImage = me.lookupReference('eventCoverImage').fileInputEl.dom.files[0];
            brandLogo = me.lookupReference('eventLogo').fileInputEl.dom.files[0];

            /* 
                Each Object in this array has 3 properties,
                eg:{
                    key:string,
                    value:any,
                    type:'object'/'array'/'string'/'file' (optional, unless 
                    the value is an object or an array)
                }
            */

            formDataConfig = [{
                key: 'adminId',
                value: currentEventData.adminId
            }, {
                key: 'eventName',
                value: currentEventData.eventName
            }, {
                key: 'location',
                value: currentEventData.location,
                type: 'object'
            }, {
                key: 'dateSpan',
                value: currentEventData.dateSpan,
                type: 'object'
            }, {
                key: 'website',
                value: currentEventData.website
            }, {
                key: 'coverImage',
                value: coverImage
            }, {
                key: 'brandLogo',
                value: brandLogo
            }];

            formData = me.util.buildFormData(formDataConfig);
            me.submitEventDetails(formData);
        }
    },

    submitEventDetails: function(formData) {
        var me = this,
            loadingMask = new Ext.LoadMask({
                msg: 'Updating...',
                target: me.getView()
            }),

            updateProgress = function(oEvent) {
                console.log(oEvent);
                if (oEvent.lengthComputable) {
                    var percentComplete = oEvent.loaded / oEvent.total;
                    // console.log(percentComplete);
                    // ...
                } else {
                    // Unable to compute progress information since the total size is unknown
                }
            },

            transferComplete = function(request, response) {
                // console.log(request,response);
                if (!response.success) {
                    loadingMask.hide();
                    Ext.MessageBox.alert(
                        'Failed', 'Event Details Update Failed!'
                    );
                    return;
                }
                me.populateEventDetails();
                loadingMask.hide();
                Ext.MessageBox.alert(
                    'Success', 'Event Details Updated'
                );
            },

            transferFailed = function(request) {
                loadingMask.hide();
                Ext.MessageBox.alert(
                    'Failed', 'Event Details Update Failed'
                );
            },

            transferCanceled = function(request) {
                loadingMask.hide();
                Ext.MessageBox.alert(
                    'Canceled', 'Event Details Update Canceled'
                );
            };

        /*
         * formDataRequest function accepts a config object ,
            requestConfig={
                url:'',required
                method:'',required (default is 'GET')
                data:'',required
                // Callback Functions 
                progress:function,// parameters is the progress event fired
                complete:function,// params are request and response
                failure:function, // param request
                abort:Functions // param request
            }
        */

        loadingMask.show();

        me.util.formDataRequest({
            url: me.util.api.eventDetailsUrl + Ext.decode(localStorage.getItem('AdminDetails')).eventId,
            method: "PUT",
            data: formData,
            // Callbacks
            progress: updateProgress,
            complete: transferComplete,
            failure: transferFailed,
            abort: transferCanceled
                // loadingMask: loadingMask
        }, me);
    },

    /**************************** Floor Plan View ***************************/

    populateFloorPlan: function() {
        // var me = this;
        // console.log(me.getViewModel());
    },


    /***************************** Sponsor View ******************************/

    showAddSponsorWindow: function() {
        var me = this,
            addSponsorWindow = me.lookupReference('addSponsorWindow');

        if (!addSponsorWindow) {
            addSponsorWindow = new ConferenceApp.view.event.AddSponsor();

            // A Window is a floating component, so by default it is not connected
            // to our main View in any way. By adding it, we are creating this link
            // and allow the Winwdow to be controlled by the main ViewController,
            // as well as be destroyed automatically along with the main View.
            me.getView().add(addSponsorWindow);
        }

        addSponsorWindow.show();
    },

    searchSponsors: function(input, e) {
        var inputVal = input.target.value,
            sponsorStore = Ext.getStore('Sponsors');

        // Clear the filter if no value is entered (or if the field is cleared)
        if (!inputVal.length) {
            sponsorStore.clearFilter();
            return;
        }

        // Filter the store
        sponsorStore.filter([{
            property: 'title',
            value: inputVal
        }]);
    },

    onAddSponsorFormCancel: function() {
        var me = this;
        me.lookupReference('addSponsorForm').getForm().reset();
        me.lookupReference('addSponsorWindow').hide();
    },

    onAddSponsorFormSubmit: function() {
        var me = this,
            formData,
            addSponsorData,
            formDataConfig = [],
            eventData = Ext.decode(localStorage.getItem('AdminDetails')),
            formPanel = me.lookupReference('addSponsorForm'),
            form = formPanel.getForm(),
            sponsorLogo = me.lookupReference('sponsorProfileImage').fileInputEl.dom.files[0];

        if (form.isValid()) {
            me.lookupReference('addSponsorWindow').hide();
            addSponsorData = form.getValues();
            addSponsorData.adminId = eventData.adminId;
            addSponsorData.eventId = eventData.eventId;

            /* 
            Each Object in this array has 3 properties,
                eg:{
                    key:string,
                    value:any,
                    type:'object'/'array'/'string'/'file' (optional, unless 
                    the value is an object or an array)
                }
            */

            formDataConfig = [{
                key: 'adminId',
                value: addSponsorData.adminId
            }, {
                key: 'eventId',
                value: addSponsorData.eventId
            }, {
                key: 'name',
                value: addSponsorData.brand_name
            }, {
                key: 'categoryId',
                value: addSponsorData.category_id
            }, {
                key: 'description',
                value: addSponsorData.description
            }, {
                key: 'website',
                value: addSponsorData.website
            }, {
                key: 'email',
                value: addSponsorData.google
            }, {
                key: 'profilePicture',
                value: sponsorLogo
            }];

            formData = me.util.buildFormData(formDataConfig);
            me.submitSponsorForm(formData, form);
        }
    },

    submitSponsorForm: function(formData, form) {
        var me = this,
            loadingMask = new Ext.LoadMask({
                msg: 'Adding new Sponsor...',
                target: me.getView()
            }),
            success = function(request, response) {
                if (!response.success) {
                    loadingMask.hide();
                    Ext.MessageBox.alert(
                        'Failed', 'New Sponsor could not be added'
                    );
                    return;
                }
                form.reset();
                Ext.getStore('Sponsors').load();
                loadingMask.hide();
                Ext.MessageBox.alert(
                    'Success', 'New Sponsor is added'
                );
            },
            failure = function(request) {
                loadingMask.hide();
                Ext.MessageBox.alert(
                    'Failed', 'Connection Error.'
                );
            };

        /*
        * formDataRequest function accepts a config object ,
            requestConfig={
                url:'',required
                method:'',required (default is 'GET')
                data:'',required
                // Callback Functions are optional
                progress:function,
                complete:function,
                failure:function,
                abort:function
            }
        */

        loadingMask.show();

        me.util.formDataRequest({
            url: me.util.api.addSponsorUrl,
            method: "POST",
            data: formData,
            // Callbacks
            // progress: success,
            complete: success,
            failure: failure,
            abort: failure
                // loadingMask: loadingMask
        });
    },

    sponsorProfileImageChange: function(view, value) {
        var me = this,
            sponsorProfileImageDisplayield = me.lookupReference('sponsorProfileImageDisplayield'),
            file = view.fileInputEl.dom.files[0],

            /*
             * fileConfig is a object with 4 keys
                fileConfig:{
                    file:'',required
                    displayField:'',required
                    modelData:'',optional
                    fieldName:'',optional
                }
            */

            fileConfig = {
                file: file,
                displayField: sponsorProfileImageDisplayield
            };

        me.util.readImage(fileConfig, view, false);
    },

    sponsorItemTap: function(dataview, record, item, index, e, eOpts) {
        console.log(record, item, index, e);
        var me = this,
            el = new Ext.Element(e.getTarget()),
            sponsorId = record.data._id,
            adminId = Ext.decode(localStorage.getItem('AdminDetails')).adminId;
        console.log(sponsorId);
        if (el.hasCls('sponsor-edit')) {

        }
        if (el.hasCls('sponsor-remove')) {
            Ext.Ajax.request({
                url: me.util.api.editSponsorUrl + sponsorId + '/' + adminId,
                method: 'DELETE',
                
                success: function(response) {
                    Ext.Msg.alert('Success', 'Sponsor Deleted');
                    console.log(response.responseText);
                    Ext.getStore('Sponsors').load();
                },
                failure: function(response) {
                    Ext.Msg.alert('Failed', 'Connection Error');
                }
            });

        }
    }

});
