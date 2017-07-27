const Joi = require('joi');
const UserFieldsValidationError = require('../Utils/Errors/ValidationErrors/UserFieldsValidationError');

exports.asCreate = (data) => {
    const schema = Joi.object().keys({
        login: Joi.string().min(4).max(30).required(),
        password: Joi.string().min(5).required(),
        isAdmin: Joi.boolean().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    });

    if(Joi.validate(data,schema).error){
        let message = Joi.validate(data, schema).error.details[0].message;
        throw new UserFieldsValidationError(message)
    }
};

exports.asUpdate = (data) => {
    const schema = Joi.object().keys({
        login: Joi.string().min(4).max(30),
        password: Joi.string().min(5),
        isAdmin: Joi.boolean(),
        firstName: Joi.string(),
        lastName: Joi.string()
    });

    if(Joi.validate(data,schema).error){
        let message = Joi.validate(data, schema).error.details[0].message;
        throw new UserFieldsValidationError(message)
    }
};