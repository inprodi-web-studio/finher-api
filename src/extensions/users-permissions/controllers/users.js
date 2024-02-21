const {
    USER,
} = require("../../../constants/models");

const {
    findMany,
    findOneByUuid,
} = require("../../../helpers");
const { validateKeyUpdate } = require("../validation");

const userFields = {
    fields : ["uuid", "name", "lastName", "email", "createdAt", "blockedAt"],
    populate : {
        role : {
            fields : ["name"],
        },
        invitedBy : {
            fields : ["uuid", "name", "lastName"],
        },
    },
};

module.exports = (plugin) => {
    plugin.controllers.user["find"] = async (ctx) => {
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
                        name : {
                            $contains : search,
                        },
                    },
                    {
                        lastName : {
                            $contains : search,
                        },
                    }
                ],
            })
        };

        const users = await findMany( USER, userFields, filters );

        return users;
    };

    plugin.controllers.user["me"] = async (ctx) => {
        const user = ctx.state.user;

        return user;
    };

    plugin.controllers.user["update"] = async (ctx) => {
        const data = ctx.request.body;
        const { id : uuid } = ctx.params;

        await validateKeyUpdate( data );

        const { key, value } = data;

        const { id } = await findOneByUuid( uuid, USER );

        const entityId = await plugin.services.keyFind( key, value );

        const updatedUser = await strapi.entityService.update( USER, id, {
            data : {
                [key] : entityId,
            },
            ...userFields
        });

        return updatedUser;
    };

    plugin.controllers.user["toggle"] = async (ctx) => {
        const { uuid } = ctx.params;

        const user = await findOneByUuid( uuid, USER );

        const updatedUser = await strapi.entityService.update( USER, user.id, {
            data : {
                blocked : !user.blocked,
                blockedAt : !user.blocked ? new Date().toISOString() : null,
            },
            ...userFields
        });

        return updatedUser;
    };

    plugin.controllers.user["destroy"] = async (ctx) => {
        const { id : uuid } = ctx.params;

        const user = await findOneByUuid( uuid, USER );

        const deletedUser = await strapi.entityService.update( USER, user.id, {
            data : {
                isDeleted : true,
                deletedAt : new Date().toISOString(),
            },
        });

        return deletedUser;
    };
};