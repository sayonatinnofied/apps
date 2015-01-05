"use strict";
var CanteenUserView = function(uId) {
    this.userId = uId;
};
CanteenUserView.prototype.viewWeekTrans = function(destination) {
    var userId = this.userId,
        currentDate = new Date(),
        endDate = new Date(getWeek()),
        dateArray = [];
    if (destination === undefined) {
        destination = ".week-trans-row";
    }
    for (var i = currentDate.getDate(); currentDate.getDate() >= endDate.getDate(); i--) {
        currentDate.setDate(i);
        dateArray.push(formatDate(currentDate) + "%");
    }

    dataBase.transaction(function(tx) {
        $(destination).empty();
        for (var i = 0, n = dateArray.length; i < n; i++) {
            tx.executeSql("SELECT * FROM ACCOUNT WHERE transaction_date  LIKE '" +
                dateArray[i] + "' AND user_id='" + userId + "' ORDER BY transaction_id DESC", [], function(tx, results) {
                    var len = results.rows.length,
                        lastIndex,
                        resultArray = [];
                    for (var i = 0; i < len; i++) {
                        resultArray.push($.extend({}, results.rows.item(i)));
                        lastIndex = (resultArray.length - 1);
                        resultArray[lastIndex].transaction_amount = resultArray[lastIndex].transaction_amount.toFixed(2);
                    }
                    var context = {
                            transact: resultArray
                        },
                        template = Handlebars.compile($("#week_trans").html()),
                        html = template(context);
                    $(destination).append(html);
                });
        }
    });
};


CanteenUserView.prototype.viewAllTrans = function(destination) {
    var userId = this.userId;
    if (!userId) {
        return;
    }
    if (destination === undefined) {
        destination = ".all-trans-row";
    }
    dataBase.transaction(function(tx) {
        $(destination).empty();
        tx.executeSql("SELECT * FROM ACCOUNT WHERE user_id='" + userId +
            "' ORDER BY transaction_id DESC", [], function(tx, results) {
                var resultArray = [],
                    len = results.rows.length,
                    context,
                    template,
                    lastIndex;
                for (var i = 0; i < len; i++) {
                    resultArray.push($.extend({}, results.rows.item(i)));
                    lastIndex = (resultArray.length - 1);
                    resultArray[lastIndex].transaction_amount = resultArray[lastIndex].transaction_amount.toFixed(2);
                }
                context = {
                    transact: resultArray
                };
                template = Handlebars.compile($("#all_trans").html());
                $(destination).append(template(context));
            }
        );
    });

};
CanteenUserView.prototype.viewWeekOrder = function() {
    var userId = this.userId;
    var currentDate = new Date(),
        endDate = new Date(getWeek()),
        dateArray = [];
    for (var i = currentDate.getDate(); currentDate.getDate() >= endDate.getDate(); i--) {
        currentDate.setDate(i);
        dateArray.push(formatDate(currentDate) + "%");
    }

    dataBase.transaction(function(tx) {
        $(".week-order-row").empty();
        for (var i = 0, n = dateArray.length; i < n; i++) {
            tx.executeSql("SELECT * FROM ORDER_LIST WHERE order_date LIKE '" +
                dateArray[i] + "' AND user_id='" + userId + "' ORDER BY order_id DESC", [], function(tx, results) {
                    var len = results.rows.length,
                        i,
                        resultArray = [];
                    for (i = 0; i < len; i++) {
                        resultArray.push(results.rows.item(i));
                    }

                    var context = {
                            order: resultArray
                        },
                        template = Handlebars.compile($("#week_order").html()),
                        html = template(context);
                    $(".week-order-row").append(html);
                }, null);
        }
    });
};
CanteenUserView.prototype.viewAllOrder = function() {
    var userId = this.userId;
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT * FROM ORDER_LIST" +
            " WHERE user_id='" + userId + "'", [], function(tx, results) {
                var len = results.rows.length,
                    resultArray = [],
                    template,
                    context = {
                        order: resultArray
                    };
                for (var i = 0; i < len; i++) {
                    resultArray.push(results.rows.item(i));
                }
                template = Handlebars.compile($("#all_order").html());
                $(".all-order-row").empty();
                $(".all-order-row").append(template(context));
            });
    });
};
CanteenUserView.prototype.getCurrentBalance = function() {
    var userId = this.userId;
    dataBase.transaction(function(tx) {
        tx.executeSql("SELECT SUM(transaction_amount) as balance" +
            " FROM ACCOUNT WHERE user_id='" + userId + "'", [], function(tx, results) {
                var context = {},
                    template = Handlebars.compile($("#current_balance").html()),
                    html = template(context);
                $(".current-bal").empty();
                $(".current-bal").append(html);
                if (results.rows.item(0).balance === null) {
                    return;
                }
                $(".current-balance").val(results.rows.item(0).balance.toFixed(2));
            }, null);
    });
};

CanteenUserView.prototype.init = function() {
    var me = this;
    me.viewWeekTrans();
    me.viewAllTrans();
    me.viewWeekOrder();
    me.viewAllOrder();
    me.getCurrentBalance();
    $.subscribe("onOrder", function() {
        me.viewAllOrder();
        me.viewWeekOrder();
    })
};
/*
$(document).ready(function() {
    var viewUser = new UserView(55);
    viewUser.init();
    adminView.getBalanceOfUsers();
    adminView.getTotalBalance();
});*/
