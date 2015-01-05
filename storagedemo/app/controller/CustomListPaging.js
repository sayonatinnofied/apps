Ext.define('StorageDemo.controller.CustomListPaging', {
    extend: 'Ext.plugin.ListPaging',
    alias: 'customlistpaging',
    xtype: 'customlistpaging',
    util:StorageDemo.util.Util,

    config: {

    },
    /**
     * @private
     */
    loadNextPage: function() {
        var me = this;
        if (!me.storeFullyLoaded()) {
            me.disableDataViewMask();
            me.setLoading(true);
            me.util.loadListData(me);
        }
    }

});
