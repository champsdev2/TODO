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
            data: result.rows[0]
        })
    } else {
        resp.status(400).send({
            status: 400,
            error: "the assigneed user doesn't exist"
        })
    }
}

export const getAll = async (req, res) => {
    const ownerId = req.user.id
    const tasks = await taskHelper.findAll(ownerId);
    
    if (!tasks) {
        return res.status(20).send({
            message: 'tasks are empty'
        });
    }
    return res.status(200).send({
        data: tasks
    });
}
export const getAllpublic = async (req, res) => {

    const tasks = await taskHelper.findAllScope('public');
    
    if (!tasks) {
        return res.status(20).send({
            message: 'tasks are empty'
        });
    }
    return res.status(200).send({
        data: tasks
    });
}
export const findOne = async (req, res) => {
   
    const task = await taskHelper.findOne(req.params.id);
    if (!task) {
        return res.status(422).send({
            error: 'task not found'
        });
    }
    if (task.ownerid !== req.user.id && task.scope === 'private' && task.assigneeid !== req.user.id) {
        return res.status(401).send({
            error: 'this task is not yours'
        });
    }
    return res.status(200).send({
        data: task
    });
}
export const updateTask = async (req, res) => {
   
    const task = await taskHelper.findOne(req.params.id);
    if (!task) {
        return res.status(404).send({
            error: 'task not found'
        });
    }
    if (task.ownerid !== req.user.id) {
        return res.status(401).send({
            error: 'this task is not yours'
        });
    }
    const newData = {
        title: req.body.title || task.title,
        description: req.body.description || task.description,
        status: req.body.status || task.status,
        scope: req.body.scope || task.scope,
        assigneeid: req.body.assigneeid || task.assigneeid,
    };
    const updatedtask = await taskHelper.update(req.params.id, newData);
    
    return res.status(200).send({
        message: `task with id ${updatedtask.id} was updated`,
        data: updatedtask
    });
}
export const deleteTask = async (req, res) => {
   
    const task = await taskHelper.findOne(req.params.id);
    if (!task) {
        return res.status(404).send({
            error: 'task not found'
        });
    }
    if (task.ownerid !== req.user.id) {
        return res.status(401).send({
            error: 'this task is not yours'
        });
    }
    const deletedTask = await taskHelper.delete(req.params.id);
    if (deletedTask) {
        return res.status(404).send({
            message: `task with id ${deletedTask.id} was deleted`
        });
    }
    return res.status(200).send({
        error: 'this task is not deleted'
    });
}