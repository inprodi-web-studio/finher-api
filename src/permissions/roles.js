const { USER, INVITATION, CONTACT_GROUP, CONTACT_SOURCE, CONTACT_TAG, LEAD } = require("../constants/models");

const roles = {
    public : {
        permissions : {
            [USER] : {
                auth : ["login"],
                user : ["me"],
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
                user : ["find", "update", "toggle", "destroy", "me"],
            },
            [INVITATION]     : ["find", "create", "keyUpdate", "delete"],
            [CONTACT_GROUP]  : ["find", "create", "update", "delete"],
            [CONTACT_SOURCE] : ["find", "create", "update", "delete"],
            [CONTACT_TAG]    : ["find", "create", "update", "delete"],
            [LEAD]           : ["find", "findOne", "create", "keyUpdate", "update", "uploadFile", "removeFile", "toggleStatus", "delete"],
        },
        meta : {
            type        : "super-admin",
            description : "super-admin",
        },
    },
    "sales" : {
        permissions : {
            [USER] : {
                user : ["find", "me"],
            },
        },
        meta : {
            type        : "sales",
            description : "sales",
        },
    },
};

module.exports = roles;
