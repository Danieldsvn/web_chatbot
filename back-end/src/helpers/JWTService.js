import 'dotenv/config';
import jwt from 'jsonwebtoken';


const signIn = (data) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';
  const payload = jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'});
  return payload;
};
// jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '24h'});
const verify = (token) => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded;
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};


export const JWTService = {
  signIn,
  verify,
};
