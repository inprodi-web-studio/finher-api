"use strict";

const { INVITATION, ROLE } = require("../../../constants/models");
const { findOneByAny } = require("../../../helpers");

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService( INVITATION, ({ strapi }) => ({

}));
