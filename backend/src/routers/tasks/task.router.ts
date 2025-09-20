import { Router } from 'express';
import { verifyToken } from '../../middlewares/auth.middleware';
import { TaskController } from '../../controllers/task.controller';

const router = Router();
const taskRouter = Router();
const taskController = new TaskController();

router
  .route('/')
  .get(verifyToken, taskController.getTasks.bind(taskController))
  .post(verifyToken, taskController.createTask.bind(taskController));

router
  .route('/:id')
  .get(verifyToken, taskController.getTaskById.bind(taskController))
  .put(verifyToken, taskController.updateTask.bind(taskController))
  .delete(verifyToken, taskController.deleteTask.bind(taskController));

taskRouter.use('/task/task', router);

export default taskRouter;