Ext.define('ConferenceApp.model.Speaker', {
    extend: 'Ext.data.Model',
    alias: 'model.speaker',
    fields: [
    '_id',
    'designation',
    'companyName',
    'email',
    'name',
    'eventId',
    'bio',
    'industries',
    'interests',
    {
        name: 'socialLinks'
    }, 
    'blogs',
    'websites',
    {
        name: 'profilePicture'
    },
    {
        name:'profilePictureUrl',
        mapping:'profilePicture.url'  
    }, 
    {
        name: 'location'
    },
    {
        name:'city',
        mapping:'location.city'  
    }, 
    {
        name:'state',
        mapping:'location.state'  
    }, 
    {
        name:'country',
        mapping:'location.country'  
    }, 
    'agendas',
    'followers'
    ]
});