import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ msg: 'Você precisa estar logado para fazer isso' });
    return;
  }
  try {
    const data = jwt.verify(authorization, process.env.TOKEN_SECRET);
    const { email } = data;
    req.loggedUser = email;
  } catch (e) {
    res.status(498).json({ msg:'Login inválido ou expirado.' });
    return;
  }
  next();
};
