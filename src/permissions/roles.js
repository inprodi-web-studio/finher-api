const { USER } = require("../constants/models");

const roles = {
    public : {
        permissions : {
            [USER] : {
                auth : ["login_Customer", "register_Customer", "validateCode_Customer", "forgotPassword_Customer"],
            },
        },
        meta : {
            type        : "public",
            description : "public",
        },
    },
    "super-admin" : {
        permissions : {
            [USER] : [],
        },
        meta : {
            type        : "super-admin",
            description : "super-admin",
        },
    },
};

module.exports = roles;
