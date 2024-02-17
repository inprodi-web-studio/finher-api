const { yup, validateYupSchema } = require("../../helpers/validators");

const newSource = yup.object().shape({
    name  : yup.string().required(),
    color : yup.string().required(), 
    icon  : yup.string().nullable(),
}).noUnknown().strict();

const keyUpdate = yup.object().shape({
    key : yup.string().required(),
    value : yup.string().required(),
});

module.exports = {
    validateNewSource  : validateYupSchema( newSource ),
    validateKeyUpdate : validateYupSchema( keyUpdate ),
};