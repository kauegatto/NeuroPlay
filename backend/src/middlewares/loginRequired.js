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
    const [text, token] = authorization.split(' ');
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id } = data;
    req.userId = id;
  } catch (e) {
    res.status(401).json({ errors: ['Invalid or expired token'] });
  }
  next();
};
