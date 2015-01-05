"use strict";
var Human=function(){
	var me=this;
	this.setLeg=function(leg){
		if (leg <= 2 && leg >= 0) {
            me.legCount = leg;
        } else {
            window.console.log("Number of Legs should be in the range 0-2");
        }
	};
	this.getLeg=function(){
		if (me.legCount) {
            //console.log("Number of Legs:"+me.legCount);
            return me.legCount;
        } else {
            window.console.log("Number of Legs Not Provided.!!!");
        }
	};
};
Human.prototype=new window.Animals();
Human.prototype.constructor=Human;