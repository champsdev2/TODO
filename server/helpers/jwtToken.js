import jwt from 'jsonwebtoken';

// user helper
import User from '../helpers/UserHelper';

class jwtToken {

    static async createToken(payload) {
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return `Bearer ${token}`;
    }
    
    static async verifyToken(req, res, next) {
        let token = req.headers['token'] || req.headers.authorization;
        if (!token) {
            return res.status(403).send({
                error: 'No token provided.'
            });
        }
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        } else {
            return res.status(403).send({
                error: 'token is not valid.'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(500).send({
                error: 'Failed to authenticate token.'
            });
        }
        const user = await User.findOne({query: 'id', data: decoded.id});
        if (!user) {
            return res.status(404).send({
                error: 'user not found'
            });
        }
        // if everything good, save user id,email,names to request for use in other routes
        req.user = {
            id: decoded.id,
            names: decoded.names,
            email: decoded.email
        };
        next();
    }
};

export default jwtToken;