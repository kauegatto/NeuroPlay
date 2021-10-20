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
      res.json({ errors: ['invalid login data, you should pass email and password'] });
    }
    try {
      /* ver se usuario existe*/
      const userExists = await userModel.userExists(email);
      if (!userExists) {
        res.status(400);
        res.json({ errors: ['User does not exist'] });
        return;
      }
      /*ver se a senha é válida*/
      /*
        res.status(401).json({ errors: ['invalid password'] });
        return;
      */
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
