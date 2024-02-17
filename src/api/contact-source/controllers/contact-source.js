"use strict";

const { CONTACT_SOURCE } = require("../../../constants/models");
const { findMany, findOneByUuid } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { validateNewSource } = require("../contact-source.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const sourceFields = {
    fields : ["uuid", "name", "icon", "color"],
    populate : {
        leads : {
            count : true,
        },
    },
};

module.exports = createCoreController( CONTACT_SOURCE, ({ strapi }) => ({
    async find( ctx ) {
        const { search } = ctx.query;

        const filters = {
            ...( search && {
                name : {
                    $contains : search,
                },
            })
        };

        const sources = await findMany( CONTACT_SOURCE, sourceFields, filters );

        return sources;
    },

    async findOne( ctx ) {
        const { uuid } = ctx.params;

        const source = await findOneByUuid( uuid, CONTACT_SOURCE );

        return source;
    },

    async create( ctx ) {
        const data = ctx.request.body;

        await validateNewSource( data );

        const { name } = data;

        await checkForDuplicates( CONTACT_SOURCE, {
            name,
        });

        const newSource = await strapi.entityService.create( CONTACT_SOURCE, {
            data,
            ...sourceFields
        });

        return newSource;
    },

    async update( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateNewSource( data );

        const { id } = await findOneByUuid( uuid, CONTACT_SOURCE );

        const { name } = data;
        
        await checkForDuplicates( CONTACT_SOURCE, {
            name,
        });

        const updatedSource = await strapi.entityService.update( CONTACT_SOURCE, id, {
            data,
            ...sourceFields,
        });

        return updatedSource;
    },

    async delete( ctx ) {
        const { uuid } = ctx.params;

        const { id } = await findOneByUuid( uuid, CONTACT_SOURCE );

        const deletedSource = await strapi.entityService.delete( CONTACT_SOURCE, id, sourceFields );

        return deletedSource;
    },
}));
