import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const tokenRouter = new Router();

tokenRouter.post('/', TokenController.store);
export default tokenRouter;
