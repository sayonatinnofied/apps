"use strict";
var Animals = function() {
    this.birth = "";
};
Animals.prototype.setDOB = function(date) {
    var birthDay = new Date(date);
    if (birthDay === "Invalid Date") {

        //console.log(birthDay);
    } else {
        this.birth = new Date(birthDay);
        //console.log(birthDay);
    }
};
Animals.prototype.getAge = function() {
    if (!this.birth) {
        window.console.log("Date Of Birth Not Provided");
        return;
    }
    var today = new Date();
    var nowYear = today.getFullYear();
    var nowMonth = today.getMonth();
    var nowDay = today.getDate();
    var birthYear = this.birth.getFullYear();
    var birthMonth = this.birth.getMonth();
    var birthday = this.birth.getDate();

    if (birthYear > nowYear) {
        window.console.log("Sorry!!! YOU have not aged !!! Born in Future !!!");
        return;
    }
    var age = nowYear - birthYear;
    var ageMonth = nowMonth - birthMonth;
    var ageDay = nowDay - birthday;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        age = age - 1;
        return age;
    }
    return age;
};
