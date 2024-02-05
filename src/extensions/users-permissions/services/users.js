const { findOneByAny } = require("../../../helpers");
const { BadRequestError } = require("../../../helpers/errors");

module.exports = (plugin) => {
    plugin.services.keyFind = async (key, value) => {
        let entityId;

        switch ( key ) {
            case "role":
                const { id : roleId } = await findOneByAny( value, "plugin::users-permissions.role", "name" );

                entityId = roleId;
            break;
        
            default:
                throw new BadRequestError( `The key ${key} is not supported in key update` );
        }

        return entityId;
    };
};