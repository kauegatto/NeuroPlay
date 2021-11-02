import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const tokenRouter = new Router();

tokenRouter.post('/login', TokenController.store);

export default tokenRouter;

