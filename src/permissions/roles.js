const { USER, INVITATION } = require("../constants/models");

const roles = {
    public : {
        permissions : {
            [USER] : {
                auth : ["login"],
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
            [INVITATION] : ["find", "create", "keyUpdate", "delete"],
        },
        meta : {
            type        : "super-admin",
            description : "super-admin",
        },
    },
    "sales" : {
        permissions : {
            [USER] : [],
        },
        meta : {
            type        : "sales",
            description : "sales",
        },
    },
};

module.exports = roles;
