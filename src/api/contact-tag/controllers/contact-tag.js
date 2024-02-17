"use strict";

const { CONTACT_TAG } = require("../../../constants/models");
const { findMany, findOneByUuid } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { validateNewTag } = require("../tag.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const tagFields = {
    fields : ["uuid", "name"],
    populate : {
        leads : {
            count : true,
        },
    },
};

module.exports = createCoreController( CONTACT_TAG, ({ strapi }) => ({
    async find( ctx ) {
        const { search } = ctx.query;

        const filters = {
            ...( search && {
                name : {
                    $contains : search,
                },
            })
        };

        const tags = await findMany( CONTACT_TAG, tagFields, filters );

        return tags;
    },

    async findOne( ctx ) {
        const { uuid } = ctx.params;

        const tag = await findOneByUuid( uuid, CONTACT_TAG );

        return tag;
    },
    
    async create( ctx ) {
        const data = ctx.request.body;

        await validateNewTag( data );

        const { name } = data;

        await checkForDuplicates( CONTACT_TAG, {
            name,
        });

        const newTag = await strapi.entityService.create( CONTACT_TAG, {
            data,
            ...tagFields
        });

        return newTag;
    },

    async update( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateNewTag( data );

        const { id } = await findOneByUuid( uuid, CONTACT_TAG );
        
        const { name } = data;

        await checkForDuplicates( CONTACT_TAG, {
            name,
        });

        const updatedTag = await strapi.entityService.update( CONTACT_TAG, id, {
            data,
            ...tagFields
        });

        return updatedTag;
    },

    async delete( ctx ) {
        const { uuid } = ctx.params;

        const { id } = await findOneByUuid( uuid, CONTACT_TAG );

        const deletedTag = await strapi.entityService.delete( CONTACT_TAG, id, tagFields );

        return deletedTag;
    },
}));
