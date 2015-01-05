"use strict";
var AdminOrderSet = function() {};

//Display user names including their order status  
AdminOrderSet.prototype.displayUserList = function() {
    var len,
        source = $("#user_list_template").html(),
        i,
        template,
        html,
        context,
        userList = "";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT * FROM USER", [], function(tx, results) {
            len = results.rows.length;
            for (i = 0; i < len; i++) {
                userList += "<div><input type=\"checkbox\" class=\"chk\" ><label>" +
                    results.rows.item(i).user_name + "</label></div>";
            }
            context = {
                title: "My New Post",
                body: "This is my first post!",
                users: userList
            };
            template = Handlebars.compile(source);
            html = template(context);
            $(".user-list").append(html);
            AdminOrderSet.prototype.setCheckBox();
            AdminOrderSet.prototype.setOrder();
        }, null);
    });
};

//Sets today's item
AdminOrderSet.prototype.setItem = function() {
    var isValid = false,
        context,
        template,
        statusAlert = "fe",
        source = $("#item_field_alert_template").html(),
        currentRow;
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT * FROM CURRENT_ITEM", [], function(tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                currentRow = (results.rows.item(i).date).toString();

                if (AdminOrderSet.prototype.isToDay(currentRow)) {
                    isValid = true;
                    break;
                }
            }
            if ($(".item_field").val() === "") {
                statusAlert = "Item field is empty!";
            } else if (isValid === true) {
                tx.executeSql("DELETE FROM CURRENT_ITEM WHERE date='" + currentRow + "'");
                tx.executeSql("INSERT INTO CURRENT_ITEM (item) VALUES (?)", [$(".item_field").val()]);
                statusAlert = "Item updated successfully!";
            } else {
                dataBase.transaction(function(tx1) {
                    tx1.executeSql("INSERT INTO CURRENT_ITEM (item) VALUES (?)", [$(".item_field").val()]);
                });
                statusAlert = "Item set successfully!";
            }
            context = {
                alert: statusAlert
            };
            template = Handlebars.compile(source);
            $(".item-field-alert").html(template(context));

        }, null);
    });
    AdminOrderSet.prototype.displayItem();
};

//display today's item
AdminOrderSet.prototype.displayItem = function() {
    var source = $("#today_item_template").html(),
        template,
        context,
        itemName = "Item not set";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT * FROM CURRENT_ITEM ", [], function(tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                if (AdminOrderSet.prototype.isToDay((results.rows.item(i).date).toString())) {
                    itemName = results.rows.item(i).item;
                    break;
                }
            }
            context = {
                item: itemName
            };
            template = Handlebars.compile(source);
            $(".today-item").html(template(context));
        });
    });
};

//Sets check boxes corresponding to the users who have already ordered
AdminOrderSet.prototype.setCheckBox = function() {
    var checkBoxes = $(".chk"),
        currentCheckBox,
        length;
    for (var j = 0; j < checkBoxes.length; j++) {
        (function(j) {
            dataBase.transaction(function(tx) {
                currentCheckBox = $(checkBoxes[j]);
                tx.executeSql("SELECT ORDER_LIST.order_date FROM ORDER_LIST,USER WHERE USER.user_name='" +
                    currentCheckBox.next().html() + "' AND USER.user_id=ORDER_LIST.user_id ", [], function(tx, results) {
                        length = results.rows.length;
                        for (var i = 0; i < length; i++) {
                            if (AdminOrderSet.prototype.isToDay((results.rows.item(i).order_date).toString())) {
                                currentCheckBox.prop("checked", "checked");
                                break;
                            }
                        }
                    }, null);
            });
        })(j);
    }
};

//Sets or removes order of the users depending on wheather the corresponding check boxes are
//checked or not
AdminOrderSet.prototype.setOrder = function() {
    $(".chk").on("change", function(event) {
        var currentCheckBox = $(event.target),
            currentLabel = currentCheckBox.next(),
            len;
        if (currentCheckBox.prop("checked")) {
            dataBase.transaction(function(tx) {
                tx.executeSql("SELECT user_id FROM USER WHERE user_name='" +
                    currentLabel.html() + "'", [], function(tx, results) {
                        tx.executeSql("INSERT INTO ORDER_LIST (user_id) values(?)", [results.rows.item(0).user_id]);
                        $.publish("onOrder");
                        $.publish("onOrderChange");
                    });
            });

        } else {
            dataBase.transaction(function(tx) {
                tx.executeSql("SELECT order_id,order_date FROM USER,ORDER_LIST WHERE user_name='" +
                    currentLabel.html() + "' AND ORDER_LIST.user_id=USER.user_id", [], function(tx, results) {
                        len = results.rows.length;
                        if (len) {
                            for (var i = 0; i < len; i++) {
                                (function(i) {
                                    if (AdminOrderSet.prototype.isToDay(results.rows.item(i).order_date)) {
                                        tx.executeSql("DELETE FROM ORDER_LIST WHERE order_id= '" +
                                            results.rows.item(i).order_id + "'");
                                        $.publish("onOrder");
                                        $.publish("onOrderChange");
                                    }
                                })(i);
                            }
                        }
                    });
            });
        }
    });

};

//Returns true if the passed argument is today
AdminOrderSet.prototype.isToDay = function(date) {
    var toDay = new Date();
    return (date.slice(0, 4) == toDay.getFullYear() &&
        Number(date.slice(5, 7)) == toDay.getMonth() + 1 &&
        Number(date.slice(8, 10)) == toDay.getDate());
};

//Display the names of users who have already ordered
AdminOrderSet.prototype.displayOrderList = function() {
    var length,
        source = $("#order_list_template").html(),
        isFound = false,
        context,
        template,
        listOfOrders = "<ol>";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT user_name,order_date FROM USER,ORDER_LIST " +
            "WHERE USER.user_id=ORDER_LIST.user_id ", [], function(tx, results) {
                length = results.rows.length;
                for (var i = 0; i < length; i++) {
                    if (AdminOrderSet.prototype.isToDay(results.rows.item(i).order_date)) {
                        isFound = true;
                        listOfOrders += "<li>" + results.rows.item(i).user_name + "</li>";
                    }
                }
                if (isFound) {
                    listOfOrders += "</ol>";
                } else {
                    listOfOrders = "order list empty";
                }
                context = {
                    nameList: listOfOrders
                };
                template = Handlebars.compile(source);
                $(".order-list").html(template(context));
            });
    });
};

AdminOrderSet.prototype.init = function() {
    AdminOrderSet.prototype.displayItem();
    AdminOrderSet.prototype.displayUserList();
    $(".set-item-btn").on("click", AdminOrderSet.prototype.setItem);
    $(".display-item-btn").on("click", AdminOrderSet.prototype.displayItem);
    $(".display-order-btn").on("click", AdminOrderSet.prototype.displayOrderList);
    AdminOrderSet.prototype.setOrder();
};
