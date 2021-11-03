import { Router } from 'express';
import LearnController from '../controllers/LearnController';
import loginRequired from '../middlewares/loginRequired';

const learnRouter = new Router();

learnRouter.get('/theme', loginRequired, LearnController.GetTheme);
learnRouter.get('/theme/:id', loginRequired, LearnController.FindOneTheme);
learnRouter.get('/video', loginRequired, LearnController.AlllVideos);
//learnRouter.get('/video/:id', loginRequired, LearnController.OneVideo);

export default learnRouter;

