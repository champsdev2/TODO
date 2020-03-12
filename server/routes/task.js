import { Router } from 'express';
import { createTask } from "../controllers/taskController";
import validateTask from "../middlewares/validateTask";
const router = Router();
router.post('/', validateTask.isValid, createTask);
export default router;
