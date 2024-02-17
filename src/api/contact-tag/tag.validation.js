const { yup, validateYupSchema } = require("../../helpers/validators");

const newTag = yup.object().shape({
    name : yup.string().required(),
}).noUnknown().strict();

module.exports = {
    validateNewTag : validateYupSchema( newTag ),
};