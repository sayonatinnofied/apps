"use strict";

var ValidateForm = function() {};

ValidateForm.prototype.validateCreateUserForm = function() {
    $(".create-user-form").bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The name is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    different: {
                        field: 'password',
                        message: 'The name and password cannot be the same as each other'
                    }
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                    different: {
                        field: 'password',
                        message: 'The username and password cannot be the same as each other'
                    }
                }
            },

            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty'
                    },
                    different: {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            }
        }
    });
};
ValidateForm.prototype.validateEditUserForm = function() {
	$(".edit-user-found-form").bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: 'The name is not valid',
                trigger: 'keyup',
                validators: {
                    notEmpty: {
                        message: 'Name is required and cannot be empty'
                    },
                    different: {
                        field: 'password',
                        message: 'The name and password cannot be the same as each other'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty'
                    },
                    stringLength: {
                        min: 6,
                        message: 'The password must have at least 6 characters'
                    }
                }
            }
        }
    });
};
ValidateForm.prototype.validateEditUserSearchForm = function() {
	$(".edit-user-search-from").bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: 'The username is required and cannot be empty'
                    },
                }
            },

            
        }
    });
};

