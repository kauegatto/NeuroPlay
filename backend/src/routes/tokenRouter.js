import { Router } from 'express';
import TokenController from '../controllers/TokenController.js';

const tokenRouter = new Router();

tokenRouter.post('/login', TokenController.store);

export default tokenRouter;

