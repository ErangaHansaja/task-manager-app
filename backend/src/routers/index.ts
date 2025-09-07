import { Router } from 'express';
import taskRouter from './tasks/task.router';
import authRouter from './auth.router';

const routers: Router[] = [taskRouter, authRouter];

export default routers;