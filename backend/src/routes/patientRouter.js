import { Router } from 'express';
import PatientController from '../controllers/PatientController';
import loginRequired from '../middlewares/loginRequired';

const patientRouter = new Router();

patientRouter.post('/', loginRequired, PatientController.createPatient);

export default patientRouter;

