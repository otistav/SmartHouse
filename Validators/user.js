const Joi = require('joi');

exports.asCreate = (data) => {
    const schema = Joi.object().keys({
        login: Joi.string().min(4).max(30).required(),
        password: Joi.string().min(5).required(),
        isAdmin: Joi.boolean().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    });

    if(Joi.validate(data,schema).error){
        throw Error('invalid')
    }
};
