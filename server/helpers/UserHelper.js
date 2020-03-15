import client from "../config/dbconnect";
import moment from 'moment';

class User {
  static async findOne({
    query,
    data
  }) {


    const text = `SELECT id, names, email, avatar, oauthId,createdon, modifiedon FROM users WHERE ${query} = $1`;
    try {
      const {
        rows
      } = await client.query(text, [data]);;
      return rows[0];
    } catch (error) {
      return error;
    }
  }

  /*
    @returns {object} user object
   */
  static async create(data) {
    const newuser = {
      names: data.names || '',
      email: data.email || '',
      password: data.password || '',
      oauthId: data.oauthId || '',
      avatar: data.avatar || '',
      createdon: moment(new Date()),
      modifiedon: moment(new Date()),
    };

    const text = `INSERT INTO users (names, email, password, 
          oauthId, avatar,createdon, modifiedon) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *`;
    const values = [
      newuser.names,
      newuser.email,
      newuser.password,
      newuser.oauthId,
      newuser.avatar,
      newuser.createdon,
      newuser.modifiedon,
    ];
    try {
      const {
        rows
      } = await client.query(text, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
  /* @returns {object} returns all users
   */
  static async findAll() {
    const findAllQuery = 'SELECT id, names, email, avatar, oauthId,createdon, modifiedon FROM users';
    try {
      const {
        rows,
        rowCount
      } = await client.query(findAllQuery);
      return {
        rows,
        rowCount
      };
    } catch (error) {
      return error;
    }
  }
  /*
     @param {uuid} id
     @param {object} data
   */
  static async update(id, data) {
    const queryString = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET email=$1,names=$2,password=$3,oauthId=$4,avatar=$5,modifiedon=$6
      WHERE id=$7 returning *`;
    try {
      const {
        rows
      } = await client.query(queryString, [id]);
      if (!rows[0]) {
        return {
          message: 'user not found'
        };
      }
      const values = [
        data.email || rows[0].email,
        data.names || rows[0].names,
        data.password || rows[0].password,
        data.oauthid || rows[0].oauthid,
        data.avatar || rows[0].avatar,
        moment(new Date()),
        rows[0].id,
      ];
      const response = await client.query(updateOneQuery, values);
      return response.rows[0];
    } catch (err) {
      return err;
    }
  }

  /*
    @param {uuid} id
   */
  static async delete(id) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const {
        rows
      } = await client.query(deleteQuery, [id]);
      if (!rows[0]) {
        return {
          message: 'user not found'
        };
      }
      return {
        message: 'deleted'
      };
    } catch (error) {
      return error;
    }
  }
}

export default User;