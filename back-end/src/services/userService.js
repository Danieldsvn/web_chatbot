import {createModel, getByIdModel, getByName} from '../models/userModel.js';

/* eslint-disable require-jsdoc */
export async function createService(data) {
  const userExist = await getByName(data.name);
  if (userExist) {
    return {statusCode: 403, message: 'User already exists'};
  }
  const payLoad = await createModel(data);
  return {statusCode: 201, payLoad: payLoad};
};

export async function getByIdService(data) {
  const payLoad = await getByIdModel(data);
  if (!payLoad) {
    return {statusCode: 404, message: 'User not found'};
  }

  return {statusCode: 200, payLoad: payLoad};
};
