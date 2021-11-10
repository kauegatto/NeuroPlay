import loginRequired from '../middlewares/loginRequired';
import userController from '../controllers/UserController';

import { Router } from 'express';

const userRouter = new Router();

userRouter.post('/create', UserController.create);

userRouter.get('/findPatients', loginRequired, UserController.findAllPatients);

userRouter.put('/changePassword', loginRequired, UserController.changePassword);
userRouter.put('/changePhoneNumber', loginRequired, UserController.changePhoneNumber);
userRouter.put('/changeUsername', loginRequired, UserController.changeUsername);


/* 
userRouter.get('/:id', loginRequired, userController.findOne);

userRouter.put('/:id', loginRequired, userController.update);

userRouter.delete('/:id', loginRequired, userController.delete);
*/

export default userRouter;
