Ext.define('StorageDemo.model.Video', {
    extend: 'Ext.data.Model',
    config: {
        // idProperty: 'videoId',
        fields: [{
            name: 'nextPageToken'
        }, {
            name: 'prevPageToken'
        }]
    }
});
