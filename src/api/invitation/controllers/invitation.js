"use strict";

const models = require("../../../constants/models");
const { INVITATION, ROLE } = require("../../../constants/models");
const { findOneByAny, findMany, findOneByUuid } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { validateCreateInvitation, validateKeyUpdate } = require("../invitation.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const invitationFields = {
    fields : ["uuid", "email", "createdAt"],
    populate : {
        role : {
            fields : ["name"],
        },
        invitedBy : {
            fields : ["name", "lastName"],
        },
    }
};

module.exports = createCoreController( INVITATION, ({ strapi }) => ({
    async find( ctx ) {
        const { search } = ctx.query;

        const filters = {
            ...( search && {
                email : {
                    $contains : search,
                },
            })
        };

        const invitations = await findMany( INVITATION, invitationFields, filters );

        return invitations;
    },

    async create( ctx ) {
        const data = ctx.request.body;
        const user = ctx.state.user;

        await validateCreateInvitation(data);

        const { role, email } = data;

        const { id : roleId } = await findOneByAny( role, ROLE, "name" );

        await checkForDuplicates( INVITATION, {
            email,
        });

        const newInvitation = await strapi.entityService.create( INVITATION, {
            data : {
                role : roleId,
                email,
                invitedBy : user.id,
            },
            ...invitationFields,
        });

        return newInvitation;
    },

    async keyUpdate( ctx ) {
        const data     = ctx.request.body;
        const { uuid } = ctx.params;

        await validateKeyUpdate( data );
        
        const { key, value } = data;

        const { id } = await findOneByUuid( uuid, INVITATION );

        // switch (  ) {
        //     case value:
                
        //         break;
        
        //     default:
        //         break;
        // }

        const updatedInvitation = await strapi.entityService.update( INVITATION, id, {
            data : {
                [key] : value,
            },
            ...invitationFields
        });

        return updatedInvitation;
    },

    async delete( ctx ) {
        const { id : uuid } = ctx.params;

        const { id } = await findOneByUuid( uuid, INVITATION );

        const deletedInvitation = await strapi.entityService.delete( INVITATION, id, invitationFields );

        return deletedInvitation;
    },
}));
