const { yup, validateYupSchema } = require("../../helpers/validators");

const createInvitation = yup.object().shape({
    email : yup.string().email().required(),
    role  : yup.string().required(), 
}).noUnknown().strict();

const keyUpdate = yup.object().shape({
    key : yup.string().required(),
    value : yup.string().required(),
});

module.exports = {
    validateCreateInvitation : validateYupSchema( createInvitation ),
    validateKeyUpdate        : validateYupSchema( keyUpdate ),
};