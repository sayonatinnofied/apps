Ext.define('TouchTunes.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.data.JsonP'],
    config: {
        refs: {

            //list
            videoPlaylist: 'list[name="video_playlist"]',

            videoArt: 'image[name="video_art"]',
            videoBox: 'container[name="video_box"]',
            videoPlayer: 'video[name="video_player"]'

        },

        control: {
            videoPlaylist: {
                initialize: 'initializeList',
                downkey: function() {
                    var me = this;
                    this.navlist(1);
                    if (!me.getVideoPlayer()) {
                        var list = me.getVideoPlaylist(),
                            image = me.getVideoArt();
                        image.setSrc(list.getSelection()[0].data.image);
                    }
                },
                upkey: function() {
                    var me = this;
                    this.navlist(-1);
                    if (!me.getVideoPlayer()) {
                        var list = me.getVideoPlaylist(),
                            image = me.getVideoArt();
                        image.setSrc(list.getSelection()[0].data.image);
                    }
                },
                itemtap: 'setImage',
                enterkey: 'playVideo',
                spaceKey: 'pauseVideo',
                itemdoubletap: 'playVideo'
            }

        }
    },

    /*
     * Initialize list with keyboard controls
     */
    initializeList: function() {
        var me = this;
        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 40) {
                me.getVideoPlaylist().fireEvent('downkey', e);
            }
            if (e.keyCode == 38) {
                me.getVideoPlaylist().fireEvent('upkey', e);
            }
            if (e.keyCode == 37) {
                me.getVideoPlaylist().fireEvent('leftkey', e);
            }
            if (e.keyCode == 39) {
                me.getVideoPlaylist().fireEvent('rightkey', e);
            }
            if (e.keyCode == 13) {
                me.getVideoPlaylist().fireEvent('enterkey', e);
            }
            if (e.keyCode == 32) {
                me.getVideoPlaylist().fireEvent('spaceKey', e);
            }
        });
    },

    /*
     * Navigation in the list using up and down arroy keys
     */
    navlist: function(direction) {
        var me = this,
            list = me.getVideoPlaylist(),
            records = list.getSelection(),
            store = Ext.getStore('Videos'),
            count = store.getCount(),
            image = me.getVideoArt();
        if (records.length > 0) {
            var i = store.find('id', records[0].get('id')),
                next = store.getAt(i + direction);

            if (i + direction < 0) {
                //console.log('reached the top');
                list.select(0);
            } else if (i + direction >= store.getCount()) {
                //console.log('reached the end');
                list.select(count - 1);
            } else {
                //console.log(i + direction, records[0]);
                list.select(i + direction);
                list.scrollToRecord(next);
            }

        } else {
            list.select(0);
        }
    },

    /*
     * Song Album Art is set on item tap or navigation
     */
    setImage: function(view, list, index, record, events) {
        var me = this,
            image = me.getVideoArt();
        if (me.getVideoPlayer()) {
            me.getVideoPlayer().destroy();
            image.show();
        }
        image.setSrc(record.get('image'));
    },

    /*
     * Fires When double clicked on item or pressed enter
     */
    playVideo: function() {
        var me = this,
            list = me.getVideoPlaylist(),
            record = list.getSelection()[0],
            video = Ext.Viewport.down('video'),
            videoBox = me.getVideoBox(),
            image = me.getVideoArt();
        if (me.getVideoPlayer()) {
            me.getVideoPlayer().destroy();
        }
        if (record) {
            var data = record.getData();
            image.hide();
            videoBox.add({
                xtype: 'video',
                url: data.preview,
                name: 'video_player',
                title: data.title,
                listeners: {
                    painted: function(component) {
                        var me = this;
                        me.setEnableControls(true);
                        me.play();
                        me.ghost.hide();
                        me.media.show();
                    },
                    pause: function() {
                        var me = this;
                        me.setEnableControls(true);
                        me.ghost.show();
                        me.media.show();
                        // videoBox.remove(this);
                        // image.show();
                    },
                    stop: function(component) {
                        // videoBox.remove(this);
                        // image.show();
                    }
                }
            });
        }
    },

    /*
     * Pausing the video on hitting Space Bar
     */
    pauseVideo: function() {
        var video = Ext.Viewport.down('video');
        if (video) {
            if (video.isPlaying()) {
                video.pause();
            } else {
                video.play();
            }
        }

    },

    launch: function() {
        var me = this;
        var list = me.getVideoPlaylist();
        Ext.data.JsonP.request({
            url: 'https://itunes.apple.com/us/rss/topmusicvideos/limit=25/json',
            callbackKey: 'callback',
            success: function(result, request) {
                var a = [];
                result.feed.entry.forEach(function(obj) {
                    a.push({
                        artist: obj["im:artist"],
                        title: obj["title"],
                        id: obj["id"],
                        image: obj["im:image"],
                        preview: obj["link"]
                    });
                });
                Ext.getStore('Videos').setData(a);
            }
        });
        if (me.getVideoPlaylist()) {
            Ext.defer(function() {
                list.select(0);
                var image = me.getVideoArt();
                image.setSrc(list.getSelection()[0].data.image);
            }, 2000, this);
        }
    }

});
