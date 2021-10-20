import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel';

let userModel = new UserModel();

dotenv.config();

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400);
      res.json({ errors: ['Dados de login inválidos, você deve preencher ambos os campos'] });
    }
    try {
      /* ver se usuario existe*/
      const userExists = await userModel.userExists(email);
      if (!userExists) {
        res.status(400);
        res.json({ errors: ['Usuário não existe'] });
        return;
      }
      /*ver se a senha é válida*/
      const validPass = await userModel.validateLogin(email, password);
      if (!validPass) {
        res.status(401).json({ errors: ['Senha inválida'] });
        return;
      }
      const token = jwt.sign(
        { email }, // payload
        process.env.TOKEN_SECRET, // secret
        { expiresIn: process.env.TOKEN_EXPIRATION }, // options object
      );
      res.status(200).json(token);
      return;
    } catch (e) {
      res.status(500).send('server error' + e);
    }
  }
}
export default new TokenController();
