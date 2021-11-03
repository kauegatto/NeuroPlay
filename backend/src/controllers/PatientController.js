import { PatientModel } from "../models/PatientModel";
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
}
export default new PatientController();
