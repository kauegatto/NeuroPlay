import { Router } from 'express';
import LearnController from '../controllers/LearnController.js';
import loginRequired from '../middlewares/loginRequired.js';

const learnRouter = new Router();

learnRouter.get('/theme', loginRequired, LearnController.GetTheme);
learnRouter.get('/videoTema/', loginRequired, LearnController.AlllVideosTheme);
learnRouter.get('/videoSelecionado/', loginRequired, LearnController.SelectedVideo);

export default learnRouter;

