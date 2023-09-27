import {userValid} from '../helpers/userDataValidation.js';
import {
  createModel, getByIdModel, getByNameModel,
} from '../models/userModel.js';

/* eslint-disable require-jsdoc */
export async function createService(data) {
  const dataValid = userValid(data);
  if (dataValid == true) {
    const userExist = await getByNameModel(data.name);
    if (userExist) {
      return {statusCode: 403, message: 'User already exists'};
    }
    const payLoad = await createModel(data);
    return {statusCode: 201, payLoad: payLoad};
  }

  return dataValid;
};

export async function getByIdService(data) {
  const payLoad = await getByIdModel(data);
  if (!payLoad) {
    return {statusCode: 404, message: 'User not found'};
  }

  return {statusCode: 200, payLoad: payLoad};
};
