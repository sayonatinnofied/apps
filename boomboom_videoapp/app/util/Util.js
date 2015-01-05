Ext.define('BoomBoom.util.Util', {
    requires: ['Ext.MessageBox'],
    singleton: true,

    api: (function() {
        var baseUrl = 'https://www.googleapis.com/youtube/v3/';
        // var baseUrl = 'php/action.php?https://www.googleapis.com/youtube/v3/';
        return {
            videoUrl: baseUrl + 'videos',
            searchUrl: baseUrl + 'search',
            key: 'AIzaSyD6FvoLaIFqyQGoEY4oV7TEWGAJSlDd1-8'
        }
    })(),

    failedRequest: function(errorText) {
        var error = errorText || 'Connection Error';
        Ext.Msg.alert('Error', error, Ext.emptyFn);
    },

    /*
     * Get index of requested page
     */
    getMenuIndex: function(action, me) {
        var menuStore = me.getMenu().getStore(),
            menuStoreData = menuStore.getData(),
            count = menuStore.getCount();

        for (var i = 0; i < count; i++) {
            if (menuStoreData.items[i].data.action === action) {
                return i;
            }
        }

    },

    /*
     * Shows the Active Item (With Slide)
     */
    showActiveItem: function(me, view, slide, direction) {
        me.getMenuContent().animateActiveItem(view, {
            type: slide || '',
            direction: direction || 'left'
        });
    },

    /*
     * Disables the player next previous controls
     */
    disablePlayerControls: function(me, videoIndex, videoCount) {
        me.getPlayPrev().setDisabled(false);
        me.getPlayNext().setDisabled(false);
        if (videoIndex === videoCount - 1) {
            me.getPlayNext().setDisabled(true);
        }
        if (videoIndex === 0) {
            me.getPlayPrev().setDisabled(true);
        }
    }

});
