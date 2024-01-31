const { ConflictError } = require("./errors");

const checkForDuplicates = async ( MODEL, filters ) => {
    const ctx    = strapi.requestContext.get();
    const method = ctx.request.method;

    const individualModel = MODEL.split(".")[1];

    const conflictingEntitites = await strapi.query( MODEL ).count({
        where : {
            ...filters,
            ...( method === "PUT" && ({
                uuid : {
                    $not : ctx.params.uuid,
                },
            }))
        },
    });

    if ( conflictingEntitites > 0 ) {
        throw new ConflictError({
            code     : 1062,
            nameCode : "ER_DUP_ENTRY",
        }, { key : `${ individualModel }.duplicated`, path : ctx.request.path });
    }
};

module.exports = checkForDuplicates;