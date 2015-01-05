Ext.define('ConferenceApp.model.Sponsor', {
    extend: 'Ext.data.Model',
    alias: 'model.sponsor',
    idProperty: 'title',
    fields: [{
        name: 'src',
        type: 'string',
        mapping:'profilePicture.url',
        convert:function(value){
        	return ('http://192.168.2.3:8000/'+value);
        }
    }, {
        name: 'title',
        type: 'string',
        mapping: 'name'
    }, {
        name: 'category',
        mapping: 'category.name'
    }, {
        name: 'website'
    }, {
        name: 'facebookurl',
        mapping: 'socialLinks[0].url'
    }, {
        name: 'twitterurl',
        mapping: 'socialLinks[1].url'
    }, {
        name: 'linkedinurl',
        mapping: 'socialLinks[2].url'
    }, {
        name: 'googleurl',
        mapping: 'socialLinks[3].url'
    }]
});
