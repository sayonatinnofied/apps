Ext.define('StorageDemo.model.Video', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'videoId',
        fields: [{
            name: 'snippet',
            mapping: 'snippet'
        }, {
            name: 'thumbnail',
            mapping: 'snippet.thumbnails.default.url'
        }, {
            name: 'title',
            mapping: 'snippet.title'
        }]
    }
});
