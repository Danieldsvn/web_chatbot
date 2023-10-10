import {userValid} from '../helpers/userDataValidation.js';
import {PasswordCrypto} from '../helpers/PasswordCrypto.js';
import {
  createModel, getByIdModel, getByNameModel, loginModel,
} from '../models/userModel.js';
import { JWTService } from '../helpers/JWTService.js';

/* eslint-disable require-jsdoc */
export async function createService(data) {
  const dataValid = userValid(data);
  if (dataValid == true) {
    const userExist = await getByNameModel(data.name);
    if (userExist) {
      return {statusCode: 403, message: 'User already exists'};
    }
    const passwordEncrypted = await PasswordCrypto.hashPassword(data.password);
    const payLoad = await createModel({
      name: data.name, password: passwordEncrypted,
    });
    return {statusCode: 201, payLoad: payLoad};
  }

  return dataValid;
};

export async function loginService(data) {
  const userExist = await getByNameModel(data.name);
  if (!userExist) {
    return {statusCode: 404, message: 'User not found'};
  };

  const {verifyPassword} = PasswordCrypto;
  const passwordMatch = await verifyPassword(data.password, userExist.password);

  if (!passwordMatch) {
    return {statusCode: 400, message: 'Wrong password'};
  }
  const payLoad = await loginModel(
      {name: data.name,
        password: userExist.password,
      });

  const accessToken = JWTService.signIn({uid: payLoad.id});
  if (accessToken === 'JWT_SECRET_NOT_FOUND') {
    return {statusCode: 500, message: 'Error in generating access token'};
  }

  return {statusCode: 200, payLoad: {...payLoad, accessToken}};
};

export async function getByIdService(data) {
  const payLoad = await getByIdModel(data);
  if (!payLoad) {
    return {statusCode: 404, message: 'User not found'};
  }

  return {statusCode: 200, payLoad: payLoad};
};
