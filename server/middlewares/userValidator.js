import Joi from '@hapi/joi';

const schemas = {
    signup: Joi.object().keys({
        names: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
        re_password: Joi.ref('password'),
    }),
    userUpdate: Joi.object().keys({
        names: Joi.string().alphanum().min(3).max(30),
        email: Joi.string().email(),
        oauthId: Joi.string(),
        password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/),
        re_password: Joi.ref('password'),
    }),
    usersignin: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]{3,30}$/).required(),
    }),
    userID: Joi.object().keys({
        id: Joi.number().required(),
    }),
};

const userValidator = (schema, property) => {
    const prop = property;
    const useSchema = schema;
    return (req, res, next) => {
        const {
            error
        } = schemas[useSchema].validate(req[prop], schema);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const {
                details
            } = error;
            const message = details.map((i) => i.message.replace(/"/g, '')).join(',');
            res.status(422).json({
                error: message
            });
        }
    };
};

export default userValidator;