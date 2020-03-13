import Router from 'express';
import Auth from './Auth'
import task from './task'

const router = Router();

router.use(Auth);
router.use(task);

export default router;