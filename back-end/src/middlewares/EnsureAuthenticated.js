import {JWTService} from '../helpers/JWTService.js';

export const ensureAuthenticated = async (req, res, next) => {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.status(401).json({message: 'User is not authorized'});
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer') {
    return res.status(401).json({message: 'User is not authorized'});
  }

  const jwtData = JWTService.verify(token);

  if (jwtData === 'JWT_SECRET_NOT_FOUND') {
    return res.status(500).json({message: 'Error in verifying token'});
  } else if (jwtData === 'INVALID_TOKEN') {
    return res.status(401).json({message: 'User is not authenticated'});
  };


  return next();
};
