import joi from 'joi';

const taskSchema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    scope: joi.string().required(),
    assigneId: joi.number()
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
}
export default validateTask;
