"use strict";

const { CONTACT_SOURCE } = require("../../../constants/models");

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService( CONTACT_SOURCE, ({ strapi }) => ({

}));
