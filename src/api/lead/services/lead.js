"use strict";

const {
    LEAD,
    USER,
    CONTACT_GROUP,
    CONTACT_SOURCE,
    CONTACT_TAG,
} = require("../../../constants/models");
const { findOneByUuid, findOneByAny } = require("../../../helpers");
const { BadRequestError } = require("../../../helpers/errors");

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService( LEAD, ({ strapi }) => ({
    async validateData( data ) {
        if ( data.responsible ) {
            const responsible = await findOneByUuid( data.responsible, USER );

            data.responsible = responsible.id;
        }

        if ( data.group ) {
            const group = await findOneByUuid( data.group, CONTACT_GROUP );

            data.group = group.id;
        }

        if ( data.source ) {
            const source = await findOneByUuid( data.source, CONTACT_SOURCE );

            data.source = source.id;
        }

        if ( data.tags ) {
            const tags = data.tags;
            data.tags  = [];

            for ( const tagUuid of tags ) {
                const tag = await findOneByUuid( tagUuid, CONTACT_TAG );

                data.tags.push( tag.id );
            }
        }
    },

    async addCounters( leads ) {
        const allCounter = await strapi.query( LEAD ).count({
            where : {
                isActive : true,
            },
        });

        leads.counters     = {};
        leads.counters.all = allCounter;
    },

    async keyFind( key, value ) {
        const ctx = strapi.requestContext.get();

        let entityId;

        switch ( key ) {
            case "source":
                if ( value ) {
                    const { id : sourceId } = await findOneByUuid( value, CONTACT_SOURCE );

                    entityId = sourceId;
                } else {
                    entityId = null;
                }
            break;

            case "responsible":
                if ( value ) {
                    const { id : responsibleId } = await findOneByUuid( value, USER );
                    
                    entityId = responsibleId;
                } else {
                    entityId = null;
                }
            break;

            case "group":
                if ( value ) {
                    const { id : groupId } = await findOneByUuid( value, CONTACT_GROUP );
                    
                    entityId = groupId;
                } else {
                    entityId = null;
                }
            break;

            case "tags":
                entityId = [];
                for ( const tag of value ) {
                    const { id : tagId } = await findOneByUuid( tag, CONTACT_TAG );
                    
                    entityId.push( tagId );
                }
            break;

            case "rating":
                entityId = value;
            break;

            default:
                throw new BadRequestError( `The key ${key} is not supported in key update`, {
                    key  : "lead.unkownKey",
                    path : ctx.request.url,
                });
        }

        return entityId;
    },

    async uploadIfAvailable( { id, files }, key, file ) {
        const ctx         = strapi.requestContext.get();
        const currentFile = files[ key ];

        if ( currentFile ) {
            throw new BadRequestError( `${ key } is already being uploaded`, {
                key  : "lead.alreadyUploaded",
                path : ctx.request.url,
            });
        }

        const uploadedFile = await strapi.plugins.upload.services.upload.uploadToEntity({
            id,
            model : LEAD,
            field : key
        }, file );

        return uploadedFile;
    },

    async deleteParallelData( id, files ) {
        const keys = Object.keys( files );

        let ids = [];

        for ( const key of keys ) {
            if ( !files[key] ) continue;

            // ? Not sure of this id path
            ids.push( files[key].id );
        }

        await strapi.plugins.upload.services.file.deleteByIds( ids );
    },
}));
