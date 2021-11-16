import { PatientModel } from "../models/PatientModel.js";
let patientModel = new PatientModel();

class PatientController {
  /* criar novo paciente */
  async createPatient(req, res) {
    const loggedUser = req.loggedUser;
    const { login, name, password } = req.body;

    if (!(login && name && password)) {
      res.status(400).json({ "msg": "Preencha todos os campos!" });
      return;
    }
    const response = await patientModel.createPatient(name, login, password, loggedUser);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async getPatientName(req, res) {
    const loggedUser = req.loggedUser;
    const { login } = req.params;
    const response = await patientModel.getPatientName(login);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async patientReport(req, res) {
    const loggedUser = req.loggedUser;
    const { email } = req.params;
    const response = await patientModel.patientReport(email);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async activityDetails(req, res) {
    const loggedUser = req.loggedUser;
    const { email } = req.params;
    const response = await patientModel.activityDetails(email);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async changePassword(req, res) {
    const loggedUser = req.loggedUser; /* tem q vlidar se o cara pode realmente mudar ne*/
    const { login } = req.params;
    const { newPassword } = req.body;
    if (!newPassword) {
      res.status(400).json({ "msg": "Preencha sua nova senha" });
      return;
    }
    const response = await patientModel.changePassword(login, newPassword);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async changePatientName(req, res) {
    const loggedUser = req.loggedUser; /* tem q vlidar se o cara pode realmente mudar ne*/
    const { login } = req.params;
    const { newUsername } = req.body;
    if (!newUsername) {
      res.status(400).json({ "msg": "Preencha o novo nome do paciente" });
      return;
    }
    const response = await patientModel.changePatientName(login, newUsername, loggedUser);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async updatePatient(req, res) {
    const loggedUser = req.loggedUser;
    const { login } = req.query;
    const { newPassword, newUsername } = req.body;
    if (!login) {
      res.status(400).json({ msg: "Você precisa especificar um paciente para altera-lo" });
      return;
    }
    if (!(newPassword && newUsername)) {
      res.status(400).json({ msg: "Você não pode deixar nenhum campo vazio!" });
      return;
    }
    const response = await patientModel.updatePatientData(login, loggedUser, newPassword, newUsername);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
  async deletePatient(req, res) {
    const loggedUser = req.loggedUser; /* tem q vlidar se o cara pode realmente deletar o paciente*/
    const { login } = req.params; /* cara que vai ser deletado*/
    if (!login) {
      res.status(400).json({ "msg": "Escolha um paciente para deletar" });
      return;
    }
    const response = await patientModel.deletePatient(loggedUser, login);
    res.status(response[0]);
    res.json(response[1]);
    return;
  }
}
export default new PatientController();
