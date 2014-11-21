Ext.define('MapDemo.controller.App', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            // Views 
            placeList: 'placelist',
            main: 'main',
            infoMap: 'infomap',
            details: 'details',

            // Buttons 
            backToMapBtn: 'button[name="back_to_map_btn"]',
            backToPlaceListBtn: 'button[name="back_to_place_list_btn"]',
            currentLocationBtn: 'button[name="current_location_btn"]',

            // Map
            map: 'map[name="info_map"]'
        },
        control: {
            placelist: {
                itemtap: 'goToMap'
            },
            backToMapBtn: {
                tap: 'backToMap'
            },
            backToPlaceListBtn: {
                tap: 'backToPlaceList'
            },
            map: {
                maprender: function(thisOb, map, eOpts) {
                    var me = this;
                    me.map = map;
                    //Ext.Function.defer(me.loadMarker, 500, me);
                }
            },
            currentLocationBtn: {
                tap: 'getDirectionToCurrentLocation'
            }
        }
    },
    goToMap: function(view, index, target, record) {
        var me = this,
            recordData;
        me.getMain().animateActiveItem(me.getInfoMap(), {
            type: 'slide',
            direction: 'left'
        });
        recordData = record.getData();
        me.loadMarker(recordData);
        // map.setCenter([recordData.latitude,recordData.longitude]);
    },
    backToMap: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getInfoMap(), {
            type: 'slide',
            direction: 'right'
        });
    },
    backToPlaceList: function() {
        var me = this;
        me.getMain().animateActiveItem(me.getPlaceList(), {
            type: 'slide',
            direction: 'right'
        });
        me.marker.setMap(null);
    },


    /*
     * Function responsible for all the marker and infobubble handling
     */

    loadMarker: function(rec) {
        var me = this,
            latlngbounds = new google.maps.LatLngBounds(),
            position,
            map = me.map,
            destination,
            store = Ext.getStore('Places'),
            ib = new InfoBubble({
                hideCloseButton: true,
                disableAutoPan: true,
                maxHeight: 110
            });

        position = new google.maps.LatLng(rec.latitude,
            rec.longitude);

        me.marker = new google.maps.Marker({
            position: position,
            map: map,
            data: rec
        });

        /*
         * Showing InfoBubble
         */
        (function(data, selfMarker) {

            google.maps.event.addListener(selfMarker, 'mousedown',
                function(event) {
                    ib.record = {
                        places: data
                    };

                    ib.setContent([
                        '<div class="infobox">',
                        '<div class="content">',
                        data.description,
                        '</div>',
                        '<img src="resources/images/arrow.png">',
                        '</div>'
                    ].join(''));

                    ib.open(map, this);

                    google.maps.event.addListener(map, 'mousedown',
                        function() {
                            ib.close();
                        });

                    /*
                     * Tap on InfoBubble handled here
                     **/
                    google.maps.event.addDomListener(ib.bubble_, 'click',
                        function(e) {

                            me.getMain().animateActiveItem(me.getDetails(), {
                                type: 'slide',
                                direction: 'left'
                            });

                            me.getDetails().setData(rec);
                        });
                });

            Ext.defer(function() {
                map.setCenter(selfMarker.position);
            }, 1000);

        }(rec, me.marker));

        latlngbounds.extend(position);
        map.setZoom(12);

    },
    getDirectionToCurrentLocation: function() {
        /********** Directions *********/
        var me = this,
            map = me.map;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }

        function showPosition(pos) {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;

            destination = new google.maps.LatLng(lat, lng);

            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();
            var request = {
                origin: 'delhi',
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                } else {
                    Ext.Msg.alert('Not Possible');
                }
            });
            directionsDisplay.setMap(map);
        }
    }
});
