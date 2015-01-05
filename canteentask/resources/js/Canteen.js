"use strict";
var Canteen = function(user_id) {
    this.user_id = user_id;
}
Canteen.prototype.init = function() {
    var user_id = this.user_id;
    var accountTab = new CanteenAdmin(),
        viewUser = new CanteenUserView(user_id),
        manageUser = new UserManager(),
        adminOrderManager = new AdminOrderSet(),
        userOrderManager = new UserOrderSet(user_id);

    //sayon Start
    prepareHtml("#user_tab",
        "#user_tab_content",
        ".navigate",
        ".navigated-content");
    viewUser.init();
    //sayon ends

    //Monojit Starts
    prepareHtml("#accounts_management_tab",
        "#accounts_management_content",
        ".navigate",
        ".navigated-content");
    accountTab.init();
    //Monojit Ends

    //Asis Start
    prepareHtml("#user_management_tab",
        "#user_management_content",
        ".navigate",
        ".navigated-content");
    manageUser.init();
    //Asis ends

    //Pabitra starts
    prepareHtml("#admin_order_management_tab",
        "#admin_order_management_content",
        ".navigate",
        ".navigated-content");
    adminOrderManager.init();

    userOrderManager.init();
    //Pabitra ends
    //Tamodeep starts
    totalTask(user_id);
    //Tamodeep Ends
}

$(document).ready(function() {
    var canteen = new Canteen(2),
    canteenTabTemplate = Handlebars.compile($("#canteen_tab").html());
    $(".container").append(canteenTabTemplate);
    canteen.init();
});
