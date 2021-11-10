import GamesController from '../controllers/GamesController';
import loginRequired from '../middlewares/loginRequired';

import { Router } from 'express';

const gamesRouter = new Router();

gamesRouter.get('/theme', loginRequired, GamesController.GetTheme);

gamesRouter.get('/theme/:id', loginRequired, GamesController.FindOneTheme);

gamesRouter.get('/:id', loginRequired, GamesController.OneGame);

export default gamesRouter;