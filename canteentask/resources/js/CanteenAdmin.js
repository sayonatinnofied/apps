"use strict";
var CanteenAdmin = function() {
    this.dataBase = dataBase;
};
CanteenAdmin.prototype.prepareDropdowns = function() { // prepares options for select tag of user names
    var resultArray = [],
        context,
        len,
        template;
    this.dataBase.transaction(function(tx) {
        tx.executeSql('SELECT * FROM USER', [], function(tx, results) {
            len = results.rows.length;
            for (var i = 0; i < len; i++) {
                resultArray.push(results.rows.item(i));
            }
            context = {
                users: resultArray
            };
            template = Handlebars.compile($("#username_dropdown").html());
            $("#depositor").append(template(context));
            $("#user_selector").append(template(context));

        });
    });
};

CanteenAdmin.prototype.initDeposit = function() {
    var me = this;
    $(".deposit-button").click(function(event) {
        event.preventDefault();
        var selectedUserId = $("#depositor").val(), //value of option selected,basically the user_id
            depositAmount = $("#deposit_amount").val();
        if (depositAmount === "" || isNaN(depositAmount) || depositAmount <= 0) {
            return;
        }
        me.dataBase.transaction(function(tx) {
            tx.executeSql("INSERT INTO ACCOUNT" +
                " (user_id,transaction_amount)" +
                " VALUES (?,?);", [selectedUserId, depositAmount], function() {
                    var updatedTransactionHistory = new CanteenUserView(selectedUserId);
                    $("#user_selector").val(selectedUserId);
                    updatedTransactionHistory.viewWeekTrans(".week-trans-row-admin");
                    updatedTransactionHistory.viewAllTrans(".all-trans-row-admin");
                    me.refreshCurrentDepositList();
                    me.refreshBalanceOfUsers();
                });
        });
        resetForm($(".form-deposit"));
    });
};

CanteenAdmin.prototype.initExpenditure = function() {
    var me = this,
        //Deducts Balance of selected users
        deductBalance = function(userIdArray, expendature) {
            var userID;
            if (userIdArray.length < 1) {
                return;
            }
            userID = userIdArray.pop();
            me.dataBase.transaction(function(tx) {
                tx.executeSql("INSERT INTO ACCOUNT " +
                    "(user_id,transaction_amount) " +
                    "VALUES (?,?);", [userID, (-expendature)],
                    function() {
                        deductBalance(userIdArray, expendature);
                    }
                );
            });
        };

    $(".expenditure-button").click(function(event) {
        event.preventDefault();
        var expenditureAmount = $("#expenditure_amount").val(),
            currentDate = new Date();
        if (expenditureAmount === "" ||
            isNaN(expenditureAmount) ||
            expenditureAmount < 0) {
            return;
        }
        currentDate = formatDate(currentDate);
        currentDate += "%";
        me.dataBase.transaction(function(tx) {
            tx.executeSql("select * FROM ORDER_LIST" +
                " WHERE order_date LIKE ?;", [currentDate],
                function(tx, results) {
                    var foodPackageCount = results.rows.length,
                        perHeadExpenditure,
                        usersRquestedFood = [];
                    if (foodPackageCount) {
                        perHeadExpenditure = (expenditureAmount / foodPackageCount);
                        me.dataBase.transaction(function(tx) { //delete current day's balance deduction if any
                            tx.executeSql("DELETE FROM ACCOUNT" +
                                " WHERE transaction_amount < 0 " +
                                "AND transaction_date LIKE ?;", [currentDate]
                            );
                        });
                        for (var i = 0; i < results.rows.length; i++) {
                            usersRquestedFood.push(results.rows.item(i).user_id);
                        }
                        if (expenditureAmount > 0) {
                            deductBalance(usersRquestedFood, perHeadExpenditure);
                        }
                        me.refreshExpenditureHistory();
                        me.refreshBalanceOfUsers();
                        resetForm($(".form-expenditure"));
                    }
                }
            );
        });
    });
};

CanteenAdmin.prototype.initTransactionHistory = function() { //prepares "on-change" event handler on selection 
    $("#user_selector").on("change", function() {
        var selectedUser = $("#user_selector").val();
        var transactionHistory = new CanteenUserView(selectedUser);
        transactionHistory.viewWeekTrans(".week-trans-row-admin");
        transactionHistory.viewAllTrans(".all-trans-row-admin");

    }); //of user name in Transaction History tab
};

CanteenAdmin.prototype.refreshCurrentDepositList = function() {
    var currentDate = formatDate(new Date());
    currentDate += "%";
    this.dataBase.transaction(function(tx) {
        tx.executeSql("SELECT USER.user_name as user_name," +
            "ACCOUNT.transaction_amount as transaction_amount," +
            "ACCOUNT.transaction_date as transaction_date" +
            " FROM ACCOUNT,USER WHERE USER.user_id=ACCOUNT.user_id AND" +
            " transaction_date LIKE '" + currentDate +
            "' AND transaction_amount >=0 ORDER BY" +
            " ACCOUNT.transaction_id", [], function(tx, results) {
                var resultArray = [],
                    len = results.rows.length,
                    lastIndex;
                for (var i = 0; i < len; i++) {
                    resultArray.push($.extend({}, results.rows.item(i)));
                    lastIndex = (resultArray.length - 1);
                    resultArray[lastIndex].transaction_amount = resultArray[lastIndex].transaction_amount.toFixed(2);
                }
                var context = {
                        deposits: resultArray
                    },
                    template = Handlebars.compile($("#todays_deposit_template").html()),
                    html = template(context);
                $(".deposits-table").empty();
                $(".deposits-table").append(html);
            });
    });
};

CanteenAdmin.prototype.refreshExpenditureHistory = function() {
    this.dataBase.transaction(function(tx) {
        tx.executeSql("SELECT SUM(transaction_amount) as transaction_amount," +
            "transaction_date from ACCOUNT WHERE transaction_amount<0 " +
            "group by transaction_date ORDER BY" +
            " transaction_id DESC", [], function(tx, results) {
                var resultArray = [],
                    lastIndex;
                for (var i = 0; i < results.rows.length; i++) {
                    resultArray.push($.extend({}, results.rows.item(i)));
                    lastIndex = (resultArray.length - 1);

                    resultArray[lastIndex].transaction_amount = (0 - resultArray[lastIndex].transaction_amount).toFixed(2);
                }
                var context = {
                        expenditures: resultArray
                    },
                    template = Handlebars.compile($("#expenditures_template").html()),
                    html = template(context);
                $(".expenditures-table").empty();
                $(".expenditures-table").append(html);
            });
    });
};

CanteenAdmin.prototype.refreshBalanceOfUsers = function() {
    var me = this;
    this.dataBase.transaction(function(tx) {
        tx.executeSql("SELECT user_name as usrName," +
            "SUM(transaction_amount) as currBalance" +
            " FROM ACCOUNT , USER where ACCOUNT.user_id=USER.user_id" +
            " group by USER.user_id", [], function(tx, results) {
                var len = results.rows.length,
                    lastIndex,
                    resultArray = [];

                for (var i = 0; i < len; i++) {
                    resultArray.push($.extend({}, results.rows.item(i)));
                    lastIndex = (resultArray.length - 1);
                    resultArray[lastIndex].currBalance = resultArray[lastIndex].currBalance.toFixed(2);
                }
                var context = {
                        user: resultArray
                    },
                    template = Handlebars.compile($("#all_user_balance").html()),
                    html = template(context);
                $(".admin-all-user-bal").empty();
                $(".admin-all-user-bal").append(html);
            });
    });
    me.refreshTotalBalance();
};
CanteenAdmin.prototype.refreshTotalBalance = function() {
    this.dataBase.transaction(function(tx) {
        tx.executeSql("SELECT SUM(transaction_amount) as totalBalance" +
            " FROM ACCOUNT", [], function(tx, results) {
                var context = {},
                    template = Handlebars.compile($("#total_balance").html()),
                    html = template(context);
                $(".sum-total").empty();
                $(".sum-total").append(html);
                if (results.rows.item(0).totalBalance === null) {
                    return;
                }
                $(".total-balance").val(results.rows.item(0).totalBalance.toFixed(2));
            });
    });
};
CanteenAdmin.prototype.init = function() {
    var me = this;
    me.prepareDropdowns();
    me.initDeposit();
    me.initExpenditure();
    me.initTransactionHistory();
    me.refreshCurrentDepositList();
    me.refreshExpenditureHistory();
    me.refreshBalanceOfUsers();
}
