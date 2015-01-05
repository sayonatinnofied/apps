"use strict";
var UserManager = function() {};

//create user account
UserManager.prototype.createUserAccount = function() {

    var finalizeCreateUser = function() {
            var template,
                context = {
                    message: "User account succesfully created of : " + $("#name").val()
                };
            template = Handlebars.compile($("#create_user_message").html());
            $(".create-user-form").prepend(template(context));
            $("#name").val("");
            $("#login_id").val("");
            $("#input_password").val("innofied");
        },
        //creates events for create user page submit button 
        createEvent = function() {

            $(".create-user-submit").on("click", function(event) {

                var bootstrapValidator = $(".create-user-form").data("bootstrapValidator");

                if (!bootstrapValidator.isValid()) {
                    return;
                }
                var name = $("#name").val(),
                    loginId = $("#login_id").val(),
                    password = $("#input_password").val(),
                    gender = $("input[name=gender]:checked").val(),
                    roleName = $("#select_role").val(),
                    roleId, query;

                dataBase.transaction(function(tx) {
                    tx.executeSql('SELECT role_id FROM role where role_type="' + roleName + '"', [],
                        function(tx, results) {
                            roleId = results.rows.item(0).role_id;
                            query = "INSERT INTO USER (login_id,password,role_id,user_name,gender) VALUES(?,?,?,?,?)";
                            tx.executeSql(query, [loginId, password, roleId, name, gender],
                                function() {
                                    finalizeCreateUser();
                                },
                                function() {
                                    var template, html,
                                        context = {
                                            msg: "Username already exists! Try different one."
                                        };
                                    template = Handlebars.compile($("#wrong_username_message").html());
                                    html = template(context);
                                    $(".create-user-form").prepend(html);
                                });
                        });
                });
            });
            $(".create-user-form").submit(function(event) {
                return false;
            });
        };

    new ValidateForm().validateCreateUserForm();
    createEvent();
};

//edit user account 
UserManager.prototype.editUserAccount = function() {
    //update details of a particular user
    var updateUserDetails = function() {
            var name = $("#name_edit").val(),
                loginId = $("#edit_username").val(),
                password = $("#input_password_edit").val(),
                gender = $("input[name=gender]:checked").val(),
                roleName = $("#select_role").val(),
                roleId, query;
            dataBase.transaction(function(tx) {
                tx.executeSql('SELECT role_id FROM role where role_type="' + roleName + '"', [],
                    function(tx, results) {
                        roleId = results.rows.item(0).role_id;
                        query = "UPDATE USER set password='" + password + "',role_id='" + roleId + "',user_name='";
                        query = query + name + "',gender='" + gender + "' where login_id= '" + loginId + "'";
                        tx.executeSql(query, [],
                            function() {
                                var template,
                                    context = {
                                        message: "User account succesfully updated of : " + loginId
                                    };
                                template = Handlebars.compile($("#user_account_updated_message").html());
                                $(".edit-user-result div").replaceWith(template(context));
                                $("#edit_username").prop("disabled", false);
                            },
                            function() {
                                alert("update failed");
                            });
                    });

            });
        },
        //search the user with username 
        searchThenSet = function() {
            var userName = $("#edit_username").val(),
                length, template;
            dataBase.transaction(function(tx) {
                tx.executeSql('SELECT * FROM user where login_id="' + userName + '"', [],
                    function(tx, results) {
                        length = results.rows.length;
                        if (length > 0) {
                            var userId = results.rows.item(0).user_id,
                                password = results.rows.item(0).password,
                                roleId = results.rows.item(0).role_id,
                                name = results.rows.item(0).user_name,
                                gender = results.rows.item(0).gender,
                                roleType;

                            $("#edit_username").prop("disabled", true);
                            template = Handlebars.compile($("#edit_user_found").html());
                            $(".edit-user-result div").replaceWith(template());

                            $("#name_edit").val(name);
                            $("#input_password_edit").val(password);
                            if (gender === "M") {
                                $("#gender_male").prop("checked", true);
                            } else {
                                $("#gender_female").prop("checked", true);
                            }
                            if (roleId === 1) {
                                $("#select_role_edit").children("option:last-child").prop("selected", true);
                            } else {
                                $("#select_role_edit").children("option:first-child").prop("selected", true);
                            }

                            new ValidateForm().validateEditUserForm();
                            $(".edit-user-update-button").on("click", function(event) {

                                $(".edit-user-found-form").keydown();
                                $(".edit-user-found-form").keypress();
                                $("#name_edit").keyup();
                                var bootstrapValidator = $(".edit-user-found-form").data("bootstrapValidator");
                                if (!bootstrapValidator.isValid()) {
                                    return;
                                }

                                updateUserDetails();
                            });
                            $(".edit-user-found-form").submit(function(event) {
                                return false;
                            });

                        } else {
                            template = Handlebars.compile($("#edit_user_not_found").html());
                            $(".edit-user-result div").replaceWith(template());
                        }
                    });

            });
        },
        autoCompleteUsername = function() {
            var username = [],
                length, i;
            dataBase.transaction(function(tx) {
                tx.executeSql("SELECT login_id FROM USER", [],
                    function(tx, results) {
                        length = results.rows.length;
                        for (i = 0; i < length; i++) {

                            username.push(results.rows.item(i).login_id);
                        }
                        $("#edit_username").autocomplete({
                            source: username
                        });
                    });
            });
        },
        createEvent = function() {
            $(".edit_user_search_button").on("click", function() {
                var bootstrapValidator = $(".edit-user-search-from").data("bootstrapValidator");
                if (!bootstrapValidator.isValid()) {
                    return;
                }
                searchThenSet();
            });

            $(".edit-user-search-from").submit(function(event) {
                return false;
            });
        },

        template = Handlebars.compile($("#edit_user_form").html());
    $("#edit_user").append(template);

    new ValidateForm().validateEditUserSearchForm();
    autoCompleteUsername();
    createEvent();
};
UserManager.prototype.init = function() {
    this.createUserAccount();
    this.editUserAccount();
};
