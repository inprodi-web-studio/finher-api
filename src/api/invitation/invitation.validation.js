const { yup, validateYupSchema } = require("../../helpers/validators");

const createInvitation = yup.object().shape({
    email : yup.string().email().required(),
    role  : yup.string().required(), 
}).noUnknown().strict();

module.exports = {
    validateCreateInvitation : validateYupSchema( createInvitation ),
};