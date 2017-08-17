const Joi = require('joi');
const UserFieldsValidationError = require('../Utils/Errors/ValidationErrors/UserFieldsValidationError');

exports.asCreate = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(30).required(),
    typeUUID: Joi.string().required()

  });

  if(Joi.validate(data,schema).error){
    let message = Joi.validate(data, schema).error.details[0].message;
    throw new UserFieldsValidationError(message)
  }
};

exports.asUpdate = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(1).max(30).required(),
    typeUUID: Joi.string().required()
  });

  if(Joi.validate(data,schema).error){
    let message = Joi.validate(data, schema).error.details[0].message;
    throw new UserFieldsValidationError(message)
  }
};