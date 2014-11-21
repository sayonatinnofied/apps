Ext.define('StorageDemo.store.Videos', {
    extend: 'Ext.data.Store',
    util: StorageDemo.util.Util,
    config: {
        model: 'StorageDemo.model.Video',
        autoLoad: true,
        // proxy: {
        //     type: 'ajax',
        //     url: 'https://www.googleapis.com/youtube/v3/search',
        //    // method: 'GET',
        //     useDefaultXhrHeader: false,
        //     extraParams: {
        //         part: 'snippet',
        //         q: 'ambarsariya',
        //         regionCode: 'IN',
        //         maxResults: 30,
        //         key: 'AIzaSyD6FvoLaIFqyQGoEY4oV7TEWGAJSlDd1-8'
        //     },
        //     reader: {
        //         type: 'json',
        //         rootProperty: 'items'
        //     }
        // }
    }
});
