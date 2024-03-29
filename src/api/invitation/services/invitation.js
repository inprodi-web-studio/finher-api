"use strict";

const { INVITATION, ROLE } = require("../../../constants/models");
const { findOneByAny } = require("../../../helpers");
const { BadRequestError } = require("../../../helpers/errors");

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService( INVITATION, ({ strapi }) => ({
    async keyFind( key, value ) {
        let entityId;

        switch ( key ) {
            case "role":
                const { id : roleId } = await findOneByAny( value, ROLE, "name" );

                entityId = roleId;
            break;
        
            default:
                throw new BadRequestError( `The key ${key} is not supported in key update` );
        }

        return entityId;
    },
}));
