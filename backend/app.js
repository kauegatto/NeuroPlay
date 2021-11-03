import express from 'express';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRouter';
import tokenRouter from './src/routes/tokenRouter';
import gamesRouter from './src/routes/gamesRouter';
import learnRouter from './src/routes/learnRouter';
import patientRouter from './src/routes/patientRouter';

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
