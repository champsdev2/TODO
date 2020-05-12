import User from '../helpers/UserHelper';
import bcrypthash from '../helpers/hashPassword';
import jwtToken from '../helpers/jwtToken';


class UserController {

    /* @param {object} req
      @param {object} res
      @returns {object} user object
     */
    static async register(req, res) {
        const {
            body
        } = req;
        const exist = await User.findOne({query: 'email',data: body.email});
        if (exist) {
            return res.status(409).send({
                error: 'Email already exist'
            });
        }

        const newUser = {
            names: body.names,
            email: body.email,
        }
        newUser.password = bcrypthash.hashpassword(body.password);
        
        newUser.avatar = '/public/avatar/noprofile.png';
        
        const savedUser = await User.create(newUser);
        if (!savedUser.id || savedUser.id === undefined) {
            return res.status(500).send({
                error: savedUser
            });
        }
        const payloaad = {
            id: savedUser.id,
            email: savedUser.email,
            names: savedUser.names,
        };
        const token = await jwtToken.createToken(payloaad);
        return res.status(201).send({
            message: 'User created successfully',
            data: {
                token,
                user: {
                    id: savedUser.id,
                    email: savedUser.email,
                    names: savedUser.names,
                    oauthid: savedUser.oauthid,
                    avatar: savedUser.avatar,
                },
            },
        });
    }

    /* @param {object} req
      @param {object} res
      @returns {object} users array
     */
    static async signin(req, res) {
        const { body }=req
        const user = await User.findOne({query: 'email',data: body.email});
        if (!user) {
            return res.status(404).send({
                error: 'Email or Password are incorrect'
            });
        }
        const ispassword = await bcrypthash.comparepassword(req.body.password, user.password);
        if (!ispassword) {
            return res.status(404).send({
                error: 'Email or Password are incorrect'
            });
        }
        const payloaad = {
            id: user.id,
            email: user.email,
            names: user.names,
        };

        const token = await jwtToken.createToken(payloaad);
        
        return res.status(200).send({
            message: 'User is successfully logged in',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    names: user.names,
                    oauthid: user.oauthid,
                    avatar: user.avatar,
                },
            },
        });
    }

    /* @param {object} req
      @param {object} res
      @returns {object} user object
     */
    static async getAll (req, res) {
        const users = await User.findAll();
        if (!users) {
            return res.status(200).send({
                message: 'users are empty'
            });
        }
        return res.status(200).send({
            data: users.rows
        });
    }

    /* @param {object} req
      @param {object} res
      @returns {object} user object
     */
    static async getOne (req, res) {
        const user = await User.findOne({query: 'id',data: req.params.id});
        if (!user) {
            return res.status(404).send({
                error: 'user not found'
            });
        }
        const userF = {
            id: user.id,
            email: user.email,
            names: user.names,
            avatar: user.avatar,
            oauthid: user.oauthid,
            createdon: user.createdon,
            modifiedon: user.modifiedon,
        }
        return res.status(200).send(userF);
    }

    /* @param {object} req
      @param {object} res
      @returns {object} updated user
     */
    static async update(req, res) {
        const user =  await User.findOne({query: 'id',data: req.user.id});
        if (!user) {
            return res.status(404).send({
                error: 'user not found'
            });
        }
        if (user.id !== req.user.id) {
            return res.status(401).send({
                error: 'this acount is not yours'
            });
        }
        const newData = {
            email: req.body.email || user.email,
            names: req.body.names || user.names,
            password: req.body.password || user.password,
        };
        if (req.body.password) {
            if (req.body.password !== req.body.re_password) {
                return res.status(400).send({
                    error: 're_password must be equal to password'
                });
            }
            newData.password = bcrypthash.hashpassword(req.body.password);
        }

        newData.avatar = user.avatar;
        const updateduser = await User.update(req.user.id, newData);
        const userSend = {
            id: updateduser.id,
            email: updateduser.email,
            names: updateduser.names,
            oauthid: updateduser.oauthid,
            avatar: updateduser.avatar,
            modifiedon: updateduser.modifiedon,
            createdon: updateduser.createdon,
        };
        return res.status(200).send({
            message: 'User is successfully updated!',
            data: userSend
        });
    }
    
    /* @param {object} req
      @param {object} res
      @returns {void} return statuc code 204
     */
    static async delete(req, res) {
        const user = await User.findOne({query: 'id',data: req.user.id});
        if (!user) {
            return res.status(404).send({
                error: 'user not found'
            });
        }
        const ref = await User.delete(req.user.id);
        return res.status(204).send(ref);
    }
    /* @param {object} req
      @param {object} res
      @returns {void} return statuc code 204
     */
    static async gcallback(req, res) {
        const payloaad = {
            id: req.user.id,
            email: req.user.email,
            names: req.user.names,
        };
        const token = await jwtToken.createToken(payloaad);

        return res.status(200).send({
            message: 'User is successfully logged in',
            data: {
                token,
                user: {
                    id: req.user.id,
                    email: req.user.email,
                    names: req.user.names,
                    oauthid: req.user.oauthid,
                    avatar: req.user.avatar,
                    modifiedon: req.user.modifiedon,
                    createdon: req.user.createdon,
                },
            },
        });
    }
};

export default UserController;
