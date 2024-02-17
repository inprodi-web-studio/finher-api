const { USER, INVITATION, CONTACT_GROUP, CONTACT_SOURCE, CONTACT_TAG, LEAD } = require("../constants/models");

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
            [INVITATION]     : ["find", "create", "keyUpdate", "delete"],
            [CONTACT_GROUP]  : ["find", "create", "update", "delete"],
            [CONTACT_SOURCE] : ["find", "create", "update", "delete"],
            [CONTACT_TAG]    : ["find", "create", "update", "delete"],
            [LEAD]           : ["find", "findOne", "create", "keyUpdate", "update", "uploadFile", "delete"],
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
