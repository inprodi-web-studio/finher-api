const {
    validateLogin,
} = require("../validation");

const {
    USER,
} = require("../../../constants/models");

const {
    findOneByAny,
    generateToken,
} = require("../../../helpers");

module.exports = (plugin) => {{}
    plugin.controllers.auth["login"] = async (ctx) => {
        const data = ctx.request.body;

        await validateLogin(data);
        
        const {
            email,
            password,
        } = data;

        const customer = await findOneByAny(email, USER, "email", {
            fields : "*",
            populate : {
                role : true,
            },
        });

        await plugin.services.validateUserContext(password, customer);

        const TOKEN = generateToken({
            id : customer.id,
        });

        return {
            token     : TOKEN,
            uuid      : customer.uuid,
            name      : customer.name,
            lastName  : customer.lastName,
            email     : customer.email,
            phone     : customer.phone,
            gender    : customer.gender,
            birthdate : customer.birthdate,
            role      : customer.role.name,
        };
    };
};