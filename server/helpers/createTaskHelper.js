import client from '../config/dbconnect';
import moment from 'moment';
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

    /*
    @returns {object} returns all tasks
   */
    static async findAll(id) {
        const findAllQuery = 'SELECT tasks.id, tasks.title, tasks.description, tasks.scope, tasks.status, tasks.ownerid, tasks.assigneeid, tasks.createdon, tasks.modifiedon, users.names as ownername, users.oauthid as owneroauthid, users.email as owneremail, users.avatar as owneravatar FROM tasks JOIN users ON tasks.ownerid= users.id WHERE tasks.ownerid= $1';
        try {
            const {
                rows,
                rowCount
            } = await client.query(findAllQuery,[id]);
            return rows;
        } catch (error) {
            return error;
        }
    }
    /*
    @returns {object} returns all tasks
   */
    static async findAllScope(scope) {
        const findAllQuery = 'SELECT tasks.id, tasks.title, tasks.description, tasks.scope, tasks.status, tasks.ownerid, tasks.assigneeid, tasks.createdon, tasks.modifiedon, users.names as ownername, users.oauthid as owneroauthid, users.email as owneremail, users.avatar as owneravatar FROM tasks JOIN users ON tasks.ownerid= users.id WHERE tasks.scope= $1';
        try {
            const {
                rows,
                rowCount
            } = await client.query(findAllQuery, [scope]);
            return rows;
        } catch (error) {
            return error;
        }
    }

    /*  @param {uuid} id
      @returns {object} task object
   */
    static async findOne(id) {
        const text = 'SELECT tasks.id, tasks.title, tasks.description, tasks.scope, tasks.status, tasks.ownerid, tasks.assigneeid, tasks.createdon, tasks.modifiedon, users.names as ownername, users.oauthid as owneroauthid, users.email as owneremail, users.avatar as owneravatar FROM tasks JOIN users ON tasks.ownerid= users.id WHERE tasks.id= $1';
        try {
            const {
                rows
            } = await client.query(text, [id]);
            return rows[0];
        } catch (error) {
            return error;
        }
    }

    /*
     @param {uuid} id
     @param {object} data
   */
    static async update(id, data) {
        const queryString = 'SELECT * FROM tasks WHERE id=$1';
        const updateOneQuery = `UPDATE tasks
      SET title=$1,description=$2,status=$3,scope=$4,assigneeid=$5,modifiedon=$6
      WHERE id=$7 returning *`;
        try {
            const {
                rows
            } = await client.query(queryString, [id]);
            if (!rows[0]) {
                return {
                    message: 'task not found'
                };
            }
            const values = [
                data.title || rows[0].title,
                data.description || rows[0].description,
                data.status || rows[0].status,
                data.scope || rows[0].scope,
                data.assigneeid || rows[0].assigneeid,
                moment(new Date()),
                rows[0].id,
            ];
            const myresponse = await client.query(updateOneQuery, values);
            return myresponse.rows[0];
        } catch (err) {
            return err;
        }
    }

    /*
    @param {uuid} id
   */
    static async delete(id) {
        const deleteQuery = 'DELETE FROM tasks WHERE id=$1 returning *';
        try {
            const {
                rows
            } = await client.query(deleteQuery, [id]);
            if (!rows[0]) {
                return {
                    message: 'task not found'
                };
            }
            return rows[0];
        } catch (error) {
            return error;
        }
    }
}
export default taskHelper;
