Ext.define('TouchTunes.model.Video', {
    extend: 'Ext.data.Model',
    requires: [],
    config: {
        fields: [{
            name: 'artist',
            mapping: 'artist.label'
        }, {
            name: 'title',
            mapping: 'title.label'
        }, {
            name: 'id',
            mapping: 'id.attributes["im:id"]'
        }, {
            name: 'image',
            mapping: 'image[2].label'
        }, {
            name: 'preview',
            mapping: 'preview[1].attributes.href'
        }]
    }
});
