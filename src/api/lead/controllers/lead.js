"use strict";

const { LEAD } = require("../../../constants/models");
const { findMany, findOneByUuid } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { UnprocessableContentError, BadRequestError, NotFoundError } = require("../../../helpers/errors");
const { validateNewLead, validateKeyUpdate, validateFileUpload } = require("../lead.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const leadFields = {
    fields : ["uuid", "email", "tradeName", "rating", "isActive", "createdAt", "value"],
    populate : {
        completeName : {
            fields : ["name", "middleName", "lastName"],
        },
        phone : {
            fields : ["code", "number"],
        },
        responsible : {
            fields : ["uuid", "name", "lastName"],
        },
        group : {
            fields : ["uuid", "name", "color", "icon"],
        },
        source : {
            fields : ["uuid", "name", "color", "icon"],
        },
        tags : {
            fields : ["uuid", "name"],
        }
    }
};

module.exports = createCoreController( LEAD, ({ strapi }) => ({
    async find( ctx ) {
        const { search } = ctx.query;

        const filters = {
            ...( search && {
                $or : [
                    {
                        email : {
                            $contains : search,
                        },
                    },
                    {
                        completeName : {
                            name : {
                                $contains : search,
                            },
                        },
                    },
                    {
                        completeName : {
                            middleName : {
                                $contains : search,
                            },
                        },
                    },
                    {
                        completeName : {
                            lastName : {
                                $contains : search,
                            },
                        },
                    },
                ],
            }),
        };

        const leads = await findMany( LEAD, leadFields, filters );

        await strapi.service( LEAD ).addCounters( leads );

        return leads;
    },

    async findOne( ctx ) {
        const { uuid } = ctx.params;

        const lead = await findOneByUuid( uuid, LEAD );

        return lead;
    },

    async create( ctx ) {
        const data = ctx.request.body;

        await validateNewLead( data );

        const { email } = data;

        await checkForDuplicates( LEAD, {
            email,
        });

        await strapi.service( LEAD ).validateData( data );

        const newLead = await strapi.entityService.create( LEAD, {
            data,
            ...leadFields,
        });

        return newLead;
    },

    async update( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateNewLead( data );

        const { email } = data;

        const { id } = await findOneByUuid( uuid, LEAD );

        await checkForDuplicates( LEAD, {
            email,
        });

        await strapi.service( LEAD ).validateData( data );

        const updatedLead = await strapi.entityService.update( LEAD, id, {
            data,
            ...leadFields,
        });

        return updatedLead;
    },

    async keyUpdate( ctx ) {
        const data = ctx.request.body;
        const { uuid } = ctx.params;

        await validateKeyUpdate( data );

        const { key, value } = data;

        const { id } = await findOneByUuid( uuid, LEAD );

        const entityId = await strapi.service( LEAD ).keyFind( key, value );

        const updatedLead = await strapi.entityService.update( LEAD, id, {
            data : {
                [key] : entityId,
            },
            ...leadFields
        });

        return updatedLead;
    }, 

    // ? PATCH api/leads/:uuid/files
    // TODO: NEED TEST
    async uploadFile( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;
        const { file } = ctx.request.files ?? {};

        await validateFileUpload( data );

        const { key } = data;

        if ( !file ) {
            throw new UnprocessableContentError(["File is required"]);
        }

        const lead = await findOneByUuid( uuid, LEAD, {
            populate : {
                files : true,
            },
        });

        const uplodadedFile = await strapi.service( LEAD ).uploadIfAvailable( lead, key, file );

        return uplodadedFile;
    },

    // ? DELETE api/leads/:uuid/files
    // TODO: NEED TEST
    async removeFile( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateFileUpload( data );

        const { key } = data;

        const { id, files } = await findOneByUuid( uuid, LEAD );

        const fileId = files[key].id;

        if ( !fileId ) {
            throw new NotFoundError( `${ key } of lead not found`, {
                key  : "lead.fileNotFound",
                path : ctx.request.url,
            });
        }

        const deletedFile = await strapi.plugins.upload.services.file.deleteByIds([ fileId ]);

        return deletedFile;
    },

    // ? PATCH api/leads/:uuid/toggle-status
    // TODO: NEED TEST
    async toggleStatus( ctx ) {
        const { uuid } = ctx.params;

        const { id, isActive } = await findOneByUuid( uuid, LEAD );

        const updatedLead = await strapi.entityService.update( LEAD, id, {
            data : {
                isActive : !isActive,
            },
            ...leadFields,
        });

        return updatedLead;
    },

    async delete( ctx ) {
        const { uuid } = ctx.params;

        const { id, files } = await findOneByUuid( uuid, LEAD, {
            populate : {
                files : true,
            },
        });

        await strapi.service( LEAD ).deleteParallelData( id, files );

        const deletedLead = await strapi.entityService.delete( LEAD, id, leadFields);

        return deletedLead;
    },
}));
