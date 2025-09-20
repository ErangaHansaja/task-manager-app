import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authRouter = Router();
const authController = new AuthController();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

authRouter.use('/auth', router);

export default authRouter;