import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/UserController';

import { Router } from 'express';

const userRouter = new Router();

userRouter.post('/create', userController.create);

/* 
userRouter.get('/', loginRequired, userController.findAll);
userRouter.get('/:id', loginRequired, userController.findOne);

userRouter.put('/:id', loginRequired, userController.update);

userRouter.delete('/:id', loginRequired, userController.delete);
*/

export default userRouter;
