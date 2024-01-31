"use strict";

const { INVITATION, ROLE } = require("../../../constants/models");
const { findOneByAny } = require("../../../helpers");
const checkForDuplicates = require("../../../helpers/checkForDuplicates");
const { validateCreateInvitation } = require("../invitation.validation");

const { createCoreController } = require("@strapi/strapi").factories;

const invitationFields = {
    fields : ["uuid", "email"],
    populate : {
        role : {
            fields : ["name"],
        },
    }
};

module.exports = createCoreController( INVITATION, ({ strapi }) => ({
    async find( ctx ) {

    },

    async create( ctx ) {
        const data = ctx.request.body;

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
            },
            ...invitationFields,
        });

        return newInvitation;
    },
}));
