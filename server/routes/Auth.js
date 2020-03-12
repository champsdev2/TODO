import express from 'express';

import UserController from '../controllers/authController';

import userValidator from '../middlewares/userValidator';
import jwtToken from '../helpers/jwtToken';
import passport from '../middlewares/passport'

const router = express.Router();
router.use(passport.initialize());

router.post('/test', (req, res) => res.status(200).json({ msg: 'it\'s works' }));
router.post('/auth/signup', userValidator('signup', 'body'), UserController.register);
router.post('/auth/signin', userValidator('usersignin', 'body'), UserController.signin);
router.get('/auth/google/', passport.authenticate('google', { scope : ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), UserController.gcallback);
router.get('/', jwtToken.verifyToken, UserController.getAll);
router.get('/:id', jwtToken.verifyToken, userValidator('userID', 'params'), UserController.getOne);
router.patch('/update/', jwtToken.verifyToken, userValidator('userUpdate', 'body'), UserController.update);
router.delete('/:id', jwtToken.verifyToken, userValidator('userID', 'params'), UserController.delete);

export default router;