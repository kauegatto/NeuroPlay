import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User';

dotenv.config();

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400);
      res.json({ errors: ['invalid login data, you should pass email and password'] });
    }
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        res.status(400);
        res.json({ errors: ['User does not exist'] });
        return;
      }
      if (!(await user.isValidPass(password))) {
        res.status(401).json({ errors: ['invalid password'] });
        return;
      }
      const id = user.getDataValue('id');
      const token = jwt.sign(
        { id }, // payload
        process.env.TOKEN_SECRET, // secret
        { expiresIn: process.env.TOKEN_EXPIRATION }, // options object
      );
      res.status(200).json(token);
      return;
    } catch (e) {
      res.status(500).send('server error');
    }
  }
}
export default new TokenController();
