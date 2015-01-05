"use strict";
/************** pub Sub *********************/

var topics = {};

jQuery.Topic = function(id) {
    var callbacks,
        topic = id && topics[id];
    if (!topic) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if (id) {
            topics[id] = topic;
        }
    }
    return topic;
};


var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var currentDay = currentDate.getDay();
var currentMonth = currentDate.getMonth();
var monthIndex = currentMonth;
var yearIndex = currentYear;
var tempKey = "";

/********* Reset Calendar ***************/

var resetCalendar = function() {
    $(document).ready(function() {
        $(".width-eq span").text("");
        $(".event-span").remove();
        $(".width-eq").css("background-color", "");
    });

};

/**************** Event Click Function ****************/

var eventSpanClick = function() {
    // $("input").attr("disabled", "disabled");
    $(".update").show();
    $(".delete").show();
    $(".save").hide();
    console.log("ami ekhne");
    var eventIndex = $(this).attr("data-event-index");
    console.log(eventIndex);
    var index = $.jStorage.index();
    var titleText = $.jStorage.get(index[eventIndex]).title.toString();
    $(".title").val(titleText);
    var placeText = $.jStorage.get(index[eventIndex]).place.toString();
    $(".place").val(placeText);
    var dateText = $.jStorage.get(index[eventIndex]).date.toString();
    $(".date").val(dateText);
    var inviteeText = $.jStorage.get(index[eventIndex]).invitee.toString();
    $(".invitee").val(inviteeText);
    tempKey = $(".date").val().toString() + $(".title").val().toString();
};

/********************** Generate Calendar ****************/

var generateCalendar = function(currentMonth, currentYear) {
    var weekArray = ["week-one", "week-two", "week-three", "week-four", "week-five"];
    var dayArray = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weekCount = 0;
    var today = currentDate.getDate();
    var dateStr = "1 " + monthArray[currentMonth] + " " + currentYear;

    var wCount = "";

    var getWeek = function(dayofmonth) {
        wCount = weekCount;
        var diff = 6 - Number(dayofmonth);
        if (diff === 0) {
            weekCount++;
        }
    };



    $(document).ready(function() {
        $(".selectedMonth").text(monthArray[currentMonth]);
        $(".selectedYear").text(currentYear);
        // $(firstDayStr.toString()).text("1");
        for (var i = 1; i <= 31; i++) {
            dateStr = i + " " + monthArray[currentMonth] + " " + currentYear;
            var nowDate = new Date(dateStr);
            var getDayOfMonth = nowDate.getDay();
            var getMonth = nowDate.getMonth();
            if (getDayOfMonth >= 0 && getMonth === currentMonth) {
                getWeek(getDayOfMonth);
                if (weekArray[wCount] === undefined) {
                    weekArray[wCount] = "week-one";
                }
                var firstDayStr = "." + weekArray[wCount] + " > ." + dayArray[getDayOfMonth] + " > span";

                console.log(i);
                console.log(firstDayStr);
                $(firstDayStr).text(i);
                var currentDiv = "." + weekArray[wCount] + " > ." + dayArray[getDayOfMonth];
                if (i === today) {
                    $(currentDiv).css("background-color", "rgb(217, 246, 225)");
                }
                if (getDayOfMonth === 0) {
                    $(currentDiv).css("background-color", "#BBC4D1");
                }
                var index = $.jStorage.index();
                $.each(index, function(key, value) {
                    var checkDate = $.jStorage.get(value).date;
                    console.log(nowDate.getTime());
                    console.log((new Date(checkDate)).getTime());
                    if (nowDate.getTime() === (new Date(checkDate)).getTime() && currentDate.getTime() <=(new Date(checkDate)).getTime() ) {
                        console.log(key);
                        var eventSpan = $("<span></span>").text($.jStorage.get(value).title);
                        eventSpan.addClass("event-span");
                        eventSpan.attr("data-toggle", "modal");
                        eventSpan.attr("data-target", "#myModal");
                        eventSpan.attr("data-event-index", key);
                        $(currentDiv).append(eventSpan);
                    }
                    if (nowDate.getTime() === (new Date(checkDate)).getTime() && currentDate.getTime() > (new Date(checkDate)).getTime() ) {
                        console.log(key);
                        var eventSpan = $("<span></span>").text($.jStorage.get(value).title);
                        eventSpan.addClass("event-span");
                        eventSpan.attr("data-event-index", key);
                        $(currentDiv).append(eventSpan);
                    }
                });
            }

        }

    });
    $(".event-span").click(eventSpanClick);


};
generateCalendar(currentMonth, currentYear);

/***************** Subscribing methods *************/

$.Topic('generate').subscribe(generateCalendar);
$.Topic('reset').subscribe(resetCalendar);

/***************** Next Month Click *************/

$(document).ready(function() {
    $(".nextMonth").click(function() {
        if (monthIndex === 11) {
            monthIndex = 0;
            yearIndex++;
            // resetCalendar();
            // generateCalendar(monthIndex, yearIndex);
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        } else {
            monthIndex++;
            // resetCalendar();
            // generateCalendar(monthIndex, yearIndex);
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        }

    });
});

/***************** Next Year Click *******************/

$(document).ready(function() {
    $(".nextYear").click(function() {
        yearIndex++;
        // resetCalendar();
        // generateCalendar(monthIndex, yearIndex);
        $.Topic('reset').publish();
        $.Topic('generate').publish(monthIndex, yearIndex);
    });
});

/****************** Previous Year Click **************/

$(document).ready(function() {
    $(".prevYear").click(function() {
        yearIndex--;
        // resetCalendar();
        // generateCalendar(monthIndex, yearIndex);
        $.Topic('reset').publish();
        $.Topic('generate').publish(monthIndex, yearIndex);
    });
});

/**************** Previous Month Click ***************/

$(document).ready(function() {
    $(".prevMonth").click(function() {
        if (monthIndex === 0) {
            monthIndex = 11;
            yearIndex--;
            // resetCalendar();
            // generateCalendar(monthIndex, yearIndex);
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        } else {
            monthIndex--;
            // resetCalendar();
            // generateCalendar(monthIndex, yearIndex);
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        }

    });
});

/*************** Event Span Click **************/

$(document).ready(function() {
    $(".event-span").click(eventSpanClick);
});
