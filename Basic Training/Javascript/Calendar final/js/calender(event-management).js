
/************* Event Form Jquery Validator *************/
$(function() {
    $("#eventForm").validate({
        // return false;
        submitHandler: function(form) {
            return false;
        }
    });
});
var value = {
    title: "",
    place: "",
    date: "",
    invitee: ""
};

/************ Save Event function ***************/

var save = function(title, place, date, invitee) {
    value.title = title;
    value.place = place;
    value.date = date;
    value.invitee = invitee;
    $.jStorage.set(value.date + value.title, value);
};

/**************** Check Function ****************/

var check = function() {
    if (($(".title").val() === "")) {

        return false;
    } else if (($(".place").val() === "")) {

        return false;
    } else if (($(".date").val() === "")) {

        return false;
    } else if (($(".invitee").val() === "")) {

        return false;
    } else {
        return true;
    }
};



$(document).ready(function() {

    /********************* Add New Event Click ****************/

    $(".addNewEvent").click(function() {
        $(".update").hide();
        $(".delete").hide();
        $(".save").show();
        $(".title").val("");
        $(".place").val("");
        $(".date").val("");
        $(".invitee").val("");
        $("label.error").hide();
        $("#datepicker").datepicker();
    });

    /*********************** Update Event click *****************/

    $(".update").click(function() {
        if (check()) {
            $.jStorage.deleteKey(tempKey);
            var titleText = $(".title").val(),
                placeText = $(".place").val(),
                dateText = $(".date").val(),
                inviteeText = $(".invitee").val();
            save(titleText, placeText, dateText, inviteeText);
            alert("Event Successfully Updated");
            $('#myModal').modal('hide');
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        }
    });

    /****************** Save Event Click *******************/

    $(".save").click(function(event) {
        if (check()) {
            var titleText = $(".title").val(),
                placeText = $(".place").val(),
                dateText = $(".date").val(),
                inviteeText = $(".invitee").val();
            save(titleText, placeText, dateText, inviteeText);
            alert("Event Successfully Saved");
            $('#myModal').modal('hide');
            $.Topic('reset').publish();
            $.Topic('generate').publish(monthIndex, yearIndex);
        }
    });

    /******************* Delete Event Click ***************/

    $(".delete").click(function() {
        var key = $(".date").val().toString() + $(".title").val().toString();
        $.jStorage.deleteKey(key);
        alert("Event Successfully Deleted");
        $('#myModal').modal('hide');
        $.Topic('reset').publish();
        $.Topic('generate').publish(monthIndex, yearIndex);
    });

    /****************** Saving using Jstorage **********************/

    var index = $.jStorage.index();
    console.log(index);
    $.each(index, function(key, value) {
        console.log($.jStorage.get(value));
    });
    //$.jStorage.flush();

})
