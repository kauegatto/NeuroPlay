import { Router } from 'express';
import PatientController from '../controllers/PatientController.js';
import loginRequired from '../middlewares/loginRequired.js';

const patientRouter = new Router();

patientRouter.post('/', loginRequired, PatientController.createPatient);
patientRouter.get('/find/:login', loginRequired, PatientController.getPatientName);
patientRouter.get('/report/:email', loginRequired, PatientController.patientReport);
patientRouter.get('/details/:email', loginRequired, PatientController.activityDetails);
patientRouter.put('/changePassword/:email', loginRequired, PatientController.changePassword);
patientRouter.put('/changePatientName/:email', loginRequired, PatientController.changePatientName);
patientRouter.put('/', loginRequired, PatientController.updatePatient);
export default patientRouter;

