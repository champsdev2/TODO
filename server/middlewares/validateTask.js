import joi from 'joi';

const taskSchema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    scope: joi.string().required(),
    assigneId: joi.number()
});
const updatetaskSchema = joi.object().keys({
    title: joi.string(),
    description: joi.string(),
    scope: joi.string(),
    assigneId: joi.number()
});
const idSchema = joi.object().keys({
    id: joi.number().required()
});
class validateTask {
    static isValid(req, res, next) {
        const { error } = joi.validate(req.body, taskSchema);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(400).json({
                status: 400,
                error: message
            })
        }
    }
    static isValidId(req, res, next) {
        const { error } = joi.validate(req.params, idSchema);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(400).json({
                status: 400,
                error: message
            })
        }
    }
    static isValidupdate(req, res, next) {
        const { error } = joi.validate(req.body, updatetaskSchema);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(400).json({
                status: 400,
                error: message
            })
        }
    }
}
export default validateTask;
