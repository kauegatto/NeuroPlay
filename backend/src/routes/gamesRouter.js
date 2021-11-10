import GamesController from '../controllers/GamesController.js';
import loginRequired from '../middlewares/loginRequired.js';

import { Router } from 'express';

const gamesRouter = new Router();

gamesRouter.get('/theme', loginRequired, GamesController.GetTheme);

gamesRouter.get('/theme/:id', loginRequired, GamesController.FindOneTheme);

gamesRouter.get('/:id', loginRequired, GamesController.OneGame);

export default gamesRouter;