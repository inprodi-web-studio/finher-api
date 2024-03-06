const { yup, validateYupSchema } = require("../../helpers/validators");

const newLead = yup.object().shape({
    completeName : yup.object().shape({
        name : yup.string().required(),
        middleName: yup.string(),
        lastName  : yup.string(),
    }).noUnknown().strict(),
    tradeName : yup.string(),
    email : yup.string().email().required(),
    phone : yup.object().shape({
        code  : yup.string().nullable(),
        number: yup.string().nullable(),
    }).noUnknown().strict(),
    mainAddress : yup.object().shape({
        street : yup.string(),
        ext    : yup.string(),
        int    : yup.string(),
        suburb : yup.string(),
        cp     : yup.string(),
        city   : yup.string(),
        state  : yup.string(),
        country: yup.string(),
    }).noUnknown().strict(),
    value       : yup.number().min(0, "Value cant be a negative number"),
    responsible : yup.string().uuid().nullable(),
    group       : yup.string().uuid().nullable(),
    source      : yup.string().uuid().nullable(),
    tags        : yup.array().of( yup.string().uuid() ).nullable(),
}).noUnknown().strict();

const keyUpdate = yup.object().shape({
    key   : yup.string().required(),
    value : yup.mixed().nullable(),
});

const fileUpload = yup.object().shape({
    key : yup.string().oneOf([
        "invoiceFront",
        "invoiceBack",
        "idFront",
        "idBack",
        "addressProof"
    ]).required(),
});

module.exports = {
    validateNewLead    : validateYupSchema( newLead ),
    validateKeyUpdate  : validateYupSchema( keyUpdate ),
    validateFileUpload : validateYupSchema( fileUpload ),
};