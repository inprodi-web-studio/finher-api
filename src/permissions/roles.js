const { USER, INVITATION, CONTACT_GROUP } = require("../constants/models");

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
            [USER] : {
                user : ["find", "update", "toggle", "destroy"],
            },
            [INVITATION] : ["find", "create", "keyUpdate", "delete"],
            [CONTACT_GROUP] : ["find", "create", "update", "delete"],
        },
        meta : {
            type        : "super-admin",
            description : "super-admin",
        },
    },
    "sales" : {
        permissions : {
            [USER] : {
                user : ["find"],
            },
        },
        meta : {
            type        : "sales",
            description : "sales",
        },
    },
};

module.exports = roles;
