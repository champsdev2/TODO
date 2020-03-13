import client from '../config/dbconnect'
import { response } from 'express';

class taskHelper {
    static async createTask(task) {
        try {
            const { ownerId, title, description, scope, status, createdOn, modifiedOn, assigneId } = task
            const query = `INSERT INTO tasks (
        title,description ,scope ,
        status ,ownerid , assigneeid ,
        createdon ,modifiedon) VALUES ($1,$2,$3,$4,$5,$6,$7 ,$8) Returning *`
            const result = await client.query(query,
                [title, description, scope, status, ownerId, assigneId, createdOn, modifiedOn]
            );
            return result;
        } catch (error) {
            return error;
        }
    }
}
export default taskHelper;
