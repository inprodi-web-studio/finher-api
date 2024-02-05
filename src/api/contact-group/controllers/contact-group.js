"use strict";

const { CONTACT_GROUP } = require("../../../constants/models");
const { findMany, findOneByUuid } = require("../../../helpers");
const { validateNewGroup, validateKeyUpdate } = require("../contact-group.validation");

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

        const newGroup = await strapi.entityService.create( CONTACT_GROUP, {
            data,
            ...groupFields
        });

        return newGroup;
    },

    async keyUpdate( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateKeyUpdate( data );

        const { key, value } = data;

        const { id } = await findOneByUuid( uuid, CONTACT_GROUP );

        return id;
    },

    async delete( ctx ) {

    },
}));
