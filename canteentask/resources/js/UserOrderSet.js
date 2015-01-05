"use strict";
var id;
var UserOrderSet = function(user_id) {
    id=user_id;
};

//Sets the order of the user
UserOrderSet.prototype.setOrder = function() {
    var source = $("#status_alert_template").html(),
        template,
        context;
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT user_id,order_date FROM ORDER_LIST WHERE user_id='" + id + "'", [], function(tx, results) {

            var len = results.rows.length,
                isFound = false;
            if (len) {
                for (var j = 0; j < len; j++) {
                    if (UserOrderSet.prototype.isToDay(results.rows.item(j).order_date)) {
                        isFound = true;
                        context = {
                            statusAlert: "already ordered"
                        };
                        template = Handlebars.compile(source);
                        $(".status-alert").html(template(context));
                        break;
                    }
                }
                if (!isFound) {
                    tx.executeSql("INSERT INTO ORDER_LIST (user_id) values(?)", [results.rows.item(j).user_id]);
                }
            } else {
                tx.executeSql("INSERT INTO ORDER_LIST (user_id) values(?)", [id]);
            }
        });
    });
    UserOrderSet.prototype.displayOrderStatus();
    $.publish("onOrder");
};

//Display the order status of the user
UserOrderSet.prototype.displayOrderStatus = function() {
    var len,
        context,
        template,
        source = $("#my_status_template").html();
    status = "Not ordered yet";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT order_date FROM ORDER_LIST WHERE user_id='" + id + "'", [], function(tx, results) {
            len = results.rows.length;
            if (len) {
                for (var j = 0; j < len; j++) {
                    if (UserOrderSet.prototype.isToDay(results.rows.item(j).order_date)) {
                        status = "Already ordered.";
                        break;
                    }

                }
            }
            context = {
                status: this.status
            };
            template = Handlebars.compile(source);
            $(".my-status").html(template(context));
        });
    });
};

//Display todays item if available
UserOrderSet.prototype.displayItem = function() {
    var source = $("#today_item_template").html(),
        template,
        context,
        itemName = "Item not set";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT * FROM CURRENT_ITEM ", [], function(tx, results) {
            var len = results.rows.length;
            for (var i = 0; i < len; i++) {
                if (UserOrderSet.prototype.isToDay((results.rows.item(i).date).toString())) {
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

//Returns true if the passed argument is today
UserOrderSet.prototype.isToDay = function(date) {
    var toDay = new Date();
    return (date.slice(0, 4) == toDay.getFullYear() &&
        Number(date.slice(5, 7)) == toDay.getMonth() + 1 &&
        Number(date.slice(8, 10)) == toDay.getDate());
};

//Display list of users who have already ordered
UserOrderSet.prototype.displayOrderList = function() {
    var length,
        source = $("#order_list_template").html(),
        isFound = false,
        context,
        template,
        listOfOrders = "<ol>";
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT user_name,order_date FROM USER,ORDER_LIST" +
            " WHERE USER.user_id=ORDER_LIST.user_id ", [], function(tx, results) {
                length = results.rows.length;
                for (var i = 0; i < length; i++) {
                    if (UserOrderSet.prototype.isToDay(results.rows.item(i).order_date)) {
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

UserOrderSet.prototype.init = function() {
    UserOrderSet.prototype.displayItem();
    UserOrderSet.prototype.displayOrderStatus();
    $(".display-order-btn").on("click", UserOrderSet.prototype.displayOrderList);
    $(".set-order-btn").on("click", UserOrderSet.prototype.setOrder);
    $.subscribe("onOrderChange",UserOrderSet.prototype.displayOrderStatus());
};
