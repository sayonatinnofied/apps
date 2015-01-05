"use strict";
var Reptile=function(){
	var me=this;
	this.setTail=function(tail){
		if(tail>=0)
		{
			me.tailCount=tail;
		}
		else {
			window.console.log("Tail should be more than -1");
		}
	};
	this.getTail=function(){
		if(me.tailCount){
			return me.tailCount;
			//console.log("Number of Tail:"+me.tailCount);
		}
		else{
			window.console.log("Number of Tail not Provided");
		}

	};
};
Reptile.prototype=new Animals();
Reptile.prototype.constructor=Reptile;