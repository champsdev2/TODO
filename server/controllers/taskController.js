import taskHelper from '../helpers/createTaskHelper'
import User from '../helpers/UserHelper'
export const createTask = async (req, resp) => {
    let assigneId;
    const { title, description, scope } = req.body
    const status = false;
    if (req.body.assigneId) {
        assigneId = req.body.assigneId
    } else {
        assigneId = undefined
    }
    const ownerId = req.user.id
    const createdOn = new Date();
    const modifiedOn = createdOn;
    //check if assigned user exists
    const exist = await User.findOne({ query: 'id', data: assigneId });
    if (exist ||  assigneId == undefined) {
        const data = {
            ownerId, title, description, scope, status, createdOn, modifiedOn, assigneId
        }
        const result = await taskHelper.createTask(data)
        resp.status(201).send({
            status: 201,
            data: result.rows
        })
    } else {
        resp.status(400).send({
            status: 400,
            error: "the assigneed user doesn't exist"
        })
    }
}
