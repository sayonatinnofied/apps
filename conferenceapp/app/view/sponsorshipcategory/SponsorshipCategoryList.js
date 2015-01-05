Ext.define('ConferenceApp.view.sponsorshipcategory.SponsorshipCategoryList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action'
    ],
    controller: 'sponsorshipcategorycontroller',
    xtype: 'sponsorshipcategorylist',
    sortable: true,
    store: 'SponsorshipCategories',
    multiSelect: true,
    // glyph: 0xf05a,
    //title: 'Sponsorship Category List',
    cls: 'sponsorship-category-list',
    disableSelection: true,
    height: '100%',

    initComponent: function() {
        var me = this;
        me.tbar = [{
            xtype: 'container',
            html: '<span class="sponsorshipcategory-list-header-title"><i class="fa fa-th-list"></i>Sponsorship Category List</span>',
        }, {
            xtype: 'button',
            cls: 'sponsorship-category-add-btn',
            handler: 'showAddSponsorshipCategoryForm',
            tooltip: 'Add New Sponsorship Category',
            glyph: 0xf067
        }];
        me.columns = [{
            xtype: 'rownumberer',
            text: '#',
            width: 50
        }, {
            text: 'Title',
            flex: 2,
            dataIndex: 'name'
        }, {
            text: 'Amount',
            flex: 1,
            dataIndex: 'amount'
        }];
        me.callParent();
    },
    listeners: {
        afterrender: function() {
            Ext.getStore('SponsorshipCategories').load();
        }
    }
});
