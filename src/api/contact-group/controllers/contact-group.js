"use strict";

const { CONTACT_GROUP } = require("../../../constants/models");
const { findMany, findOneByUuid } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { validateNewGroup } = require("../contact-group.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const groupFields = {
    fields : ["uuid", "name", "icon", "color"],
};

module.exports = createCoreController( CONTACT_GROUP, ({ strapi }) => ({
    async find( ctx ) {
        const { search } = ctx.query;

        const filters = {
            ...( search && {
                name : {
                    $contains : search,
                },
            })
        };

        const groups = await findMany( CONTACT_GROUP, groupFields, filters );

        await strapi.service( CONTACT_GROUP ).addCounters( groups.data );

        return groups;
    },

    async findOne( ctx ) {
        const { uuid } = ctx.params;

        const group = await findOneByUuid( uuid, CONTACT_GROUP );

        return group;
    },

    async create( ctx ) {
        const data = ctx.request.body;

        await validateNewGroup( data );

        const { name } = data;

        await checkForDuplicates( CONTACT_GROUP, {
            name,
        });

        const newGroup = await strapi.entityService.create( CONTACT_GROUP, {
            data,
            ...groupFields
        });

        return newGroup;
    },

    async update( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateNewGroup( data );

        const { id } = await findOneByUuid( uuid, CONTACT_GROUP );

        const updatedGroup = await strapi.entityService.update( CONTACT_GROUP, id, {
            data,
            ...groupFields,
        });

        return updatedGroup;
    },

    async delete( ctx ) {
        const { uuid } = ctx.params;

        const { id } = await findOneByUuid( uuid, CONTACT_GROUP );

        const deletedGroup = await strapi.entityService.delete( CONTACT_GROUP, id, groupFields );

        return deletedGroup;
    },
}));
