import { PatientModel } from "../models/PatientModel.js";
let patientModel = new PatientModel();

class PatientController {
  /* criar novo paciente */
  async createPatient(req, res) {
    const caralogado = req.loggedUser;
    const { login, name, password } = req.body;

    if (!(login && name && password)) {
      res.status(400).json({ "msg": "Preencha todos os campos!" });
      return;
    }

    const response = await patientModel.createPatient(name, login, password, caralogado);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async findAllFromUser(req, res) {
    const caralogado = req.loggedUser;
    const { email } = req.params;
    const response = await patientModel.findAllFromUser(email);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async patientReport(req, res) {
    const caralogado = req.loggedUser;
    const { email } = req.params;
    const response = await patientModel.patientReport(email);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async activityDetails(req, res) {
    const caralogado = req.loggedUser;
    const { email } = req.params;
    const response = await patientModel.activityDetails(email);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }

  async changePassword(req, res) {

    const caralogado = req.loggedUser;
    const { email } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      res.status(400).json({ "msg": "Preencha sua nova senha" });
      return;
    }

    const response = await patientModel.changePassword(email, newPassword);
    res.status(response[0]);
    res.json(response[1]);
    return;

  }

  async changePatientName(req, res) {

    const caralogado = req.loggedUser;
    const { email } = req.params;
    const { newPatientName } = req.body;

    if (!newPatientName) {
      res.status(400).json({ "msg": "Preencha o seu nome" });
      return;
    }

    const response = await patientModel.changePatientName(email, newPatientName);
    res.status(response[0]);
    res.json(response[1]);
    return;

  }

}
export default new PatientController();
