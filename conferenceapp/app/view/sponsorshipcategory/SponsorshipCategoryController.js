Ext.define('ConferenceApp.view.sponsorshipcategory.SponsorshipCategoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sponsorshipcategorycontroller',
    util: 'ConferenceApp.util.Util',
    requires: ['ConferenceApp.view.sponsorshipcategory.AddSponsorshipCategory'],
    showAddSponsorshipCategoryForm: function() {
        var addSponsorshipCategoryWindow = this.lookupReference('addsponsorshipcategorywindow');
        if (!addSponsorshipCategoryWindow) {
            addSponsorshipCategoryWindow = new ConferenceApp.view.sponsorshipcategory.AddSponsorshipCategory();

            this.getView().add(addSponsorshipCategoryWindow);
        }

        addSponsorshipCategoryWindow.show();
    },
    onSubmitButtonClick: function() {
        var me = this,
            addCategoryForm = me.lookupReference('addSponsorshipCatgeoryForm'),
            addCategoryFormDetails = addCategoryForm.getValues();
        addCategoryFormDetails.adminId = me.util.api.adminId;
        console.log(addCategoryForm);
        console.log(addCategoryFormDetails);
        if (addCategoryForm.isValid()) {
            me.submitForm(addCategoryFormDetails);
        }
    },
    submitForm: function(addCategoryFormDetails) {
        console.log(addCategoryFormDetails);
        Ext.Ajax.request({
            url: me.util.api.addsponsorshipUrl,
            params: {
                adminId: addCategoryFormDetails.adminId,
                name: addCategoryFormDetails.title,
                currency: addCategoryFormDetails.currency,
                price: addCategoryFormDetails.price
            },
            success: function(response) {
                console.log(response.responseText);
                Ext.getStore('SponsorshipCategories').load();
                Ext.MessageBox.alert("Success", "New Sponsorship Category Added");
            },
            failure: function(response) {
                console.log(response.responseText);
                Ext.MessageBox.alert("Failure", "New Sponsorship Category Couldn't be Added");
            }
        });
    },
    onCancelButtonClick: function() {
        var me = this,
            addCategoryForm = me.lookupReference('addSponsorshipCatgeoryForm');
        addCategoryForm.reset();
    }
});
