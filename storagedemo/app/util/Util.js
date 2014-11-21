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

    setActiveView: function(me,view,direction) {
        me.getMain().animateActiveItem(view, {
            type: 'slide',
            direction: direction
        });
    },
});
