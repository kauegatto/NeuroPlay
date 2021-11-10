import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './src/routes/userRouter.js';
import tokenRouter from './src/routes/tokenRouter.js';
import gamesRouter from './src/routes/gamesRouter.js';
import learnRouter from './src/routes/learnRouter.js';
import patientRouter from './src/routes/patientRouter.js';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use('/tokens/', tokenRouter);
    this.app.use('/user/', userRouter);
    this.app.use('/games/', gamesRouter);
    this.app.use('/learn', learnRouter);
    this.app.use('/patient/', patientRouter);

  }
}
export default new App().app; // já exporta instanciado o express (App.app)
