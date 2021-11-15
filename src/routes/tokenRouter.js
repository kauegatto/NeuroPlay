import { Router } from 'express';
import TokenController from '../controllers/TokenController.js';

const tokenRouter = new Router();

tokenRouter.post('/loginUsuario', TokenController.loginUsuario);
tokenRouter.post('/loginPaciente', TokenController.loginPaciente);

export default tokenRouter;