import { Router } from 'express';
import { createTask } from "../controllers/taskController";
import validateTask from "../middlewares/validateTask";
import jwtToken from '../helpers/jwtToken';
const router = Router();
router.post('/task',jwtToken.verifyToken, validateTask.isValid, createTask);
export default router;
