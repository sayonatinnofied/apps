"use strict";
var Bird = function() {
	var me=this;
    this.setWing = function(wing) {
        if (wing <= 2 && wing >= 0) {
            me.wingCount = wing;
        } else {
            window.console.log("Number of Wings should be in the range 0-2");
        }
    };
    this.getWing = function() {
        if (me.wingCount) {
            //console.log("Number of Wings:"+me.wingCount);
            return me.wingCount;
        } else {
            window.console.log("Number of Wings Not Provided.!!!");
        }

    };
};
Bird.prototype = new window.Animals();
Bird.prototype.constructor = Bird;
