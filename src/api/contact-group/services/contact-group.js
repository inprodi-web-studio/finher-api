"use strict";

const { CONTACT_GROUP, LEAD } = require("../../../constants/models");

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService( CONTACT_GROUP, ({ strapi }) => ({
    async addCounters( groups ) {
        for ( const group of groups ) {
            const leadCounter = await strapi.query( LEAD ).count({
                where : {
                    isActive : true,
                    group   : group.id
                },
            });

            group.leads       = {};
            group.leads.count = leadCounter;
        }
    },
}));
