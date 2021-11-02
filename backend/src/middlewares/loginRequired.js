import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ errors: ['login required'] });
    return;
  }
  try {
    // eslint-disable-next-line no-unused-vars
    const data = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { email } = data;
    req.loggedUser = email;
  } catch (e) {
    res.status(401).json({ errors: ['Token inválido ou expirado.'] });
    return;
  }
  next();
};
