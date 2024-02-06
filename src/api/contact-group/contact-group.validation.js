const { yup, validateYupSchema } = require("../../helpers/validators");

const newGroup = yup.object().shape({
    name  : yup.string().required(),
    color : yup.string().required(), 
    icon  : yup.string().nullable(),
}).noUnknown().strict();

const keyUpdate = yup.object().shape({
    key : yup.string().required(),
    value : yup.string().required(),
});

module.exports = {
    validateNewGroup  : validateYupSchema( newGroup ),
    validateKeyUpdate : validateYupSchema( keyUpdate ),
};