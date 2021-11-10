import { Router } from 'express';
import LearnController from '../controllers/LearnController';
import loginRequired from '../middlewares/loginRequired';

const learnRouter = new Router();

learnRouter.get('/theme', loginRequired, LearnController.GetTheme);
learnRouter.get('/videoTema/:id', loginRequired, LearnController.AlllVideosTheme);
learnRouter.get('/videoSelecionado/:id', loginRequired, LearnController.SelectedVideo);

export default learnRouter;

