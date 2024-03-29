import loginRequired from '../middlewares/loginRequired.js';

import userController from '../controllers/UserController.js';


import { Router } from 'express';

const userRouter = new Router();

userRouter.post('/create', userController.create);

userRouter.get('/findPatients', loginRequired, userController.findAllPatients);

userRouter.put('/changePassword', loginRequired, userController.changePassword);
userRouter.put('/changePhoneNumber', loginRequired, userController.changePhoneNumber);
userRouter.put('/changeUsername', loginRequired, userController.changeUsername);

/* 
userRouter.get('/:id', loginRequired, userController.findOne);

userRouter.put('/:id', loginRequired, userController.update);

userRouter.delete('/:id', loginRequired, userController.delete);
*/

export default userRouter;
