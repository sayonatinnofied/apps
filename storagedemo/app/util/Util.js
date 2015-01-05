Ext.define('StorageDemo.util.Util', {
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

    setActiveView: function(me, view, direction) {
        me.getMain().animateActiveItem(view, {
            type: 'slide',
            direction: direction
        });
    },


    /*
     * VideosList is populated
     */
    loadListData: function(listpaging) {
        var me = this,
            store = Ext.getStore('Videos');
        Ext.Ajax.request({
            url: me.api.searchUrl,
            method: 'GET',
            useDefaultXhrHeader: false,
            params: {
                part: 'snippet',
                q: 'ambarsariya',
                regionCode: 'IN',
                maxResults: 30,
                key: me.api.key,
                pageToken: me.nextPageToken
            },

            success: function(response, request) {
                var data = Ext.decode(response.responseText);
                console.log(store.getCount());
                if (store.getCount() > 0) {
                    store.addData(data.items);
                    listpaging.setLoading(false);
                } else {
                    store.setData(data.items);
                }
                me.nextPageToken = data.nextPageToken;

            },

            failure: function(response) {
                me.failedRequest(response.statusText);
            }
        });
    }
});
