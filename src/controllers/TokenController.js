import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';
import { PatientModel } from '../models/PatientModel.js'

let userModel = new UserModel();
let patientModel = new PatientModel();

dotenv.config();

class TokenController {

  async loginUsuario(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
      /* conferir se mandou os 2 campos */
      res.status(400);
      res.json({ msg: ['Dados de login inválidos, você deve preencher ambos os campos'] });
      return;
    }

    try {
      /* ver se usuario existe*/
      const userExists = await userModel.userExists(email);
      if (!userExists) {
        res.status(400);
        res.json({ msg: ['Usuário não existe'] });
        return;
      }
      /*ver se a senha é válida*/
      const validPass = await userModel.validateLogin(email, password);
      if (!validPass) {
        res.status(401).json({ msg: ['Senha inválida'] });
        return;
      }
      const token = jwt.sign(
        { email }, // payload
        process.env.TOKEN_SECRET, // secret
        { expiresIn: process.env.TOKEN_EXPIRATION }, // options object
      );
      res.status(200).json({ "token": token });
      return;
    } catch (e) {
      res.status(500).send('server error' + e);
    }
  }

  async loginPaciente(req, res) {

    const { email, password } = req.body;

    if (!(email && password)) {
      /* conferir se mandou os 2 campos */
      res.status(400);
      res.json({ msg: ['Dados de login inválidos, você deve preencher ambos os campos'] });
      return;
    }

    try {

      /* ver se usuario existe*/
      const userExists = await patientModel.patientExists(email);

      if (!userExists) {
        res.status(400);
        res.json({ msg: ['Usuário não existe'] });
        return;
      }

      /*ver se a senha é válida*/
      const validPass = await patientModel.validateLogin(email, password);
      if (!validPass) {
        res.status(401).json({ msg: ['Senha inválida'] });
        return;
      }

      const token = jwt.sign(
        { email }, // payload
        process.env.TOKEN_SECRET, // secret
        { expiresIn: process.env.TOKEN_EXPIRATION }, // options object
      );

      res.status(200).json({ "token": token });

      return;
    } catch (e) {
      res.status(500).send('server error' + e);
    }
  }

}
export default new TokenController();
