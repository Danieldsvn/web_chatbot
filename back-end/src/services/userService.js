import {createModel, getByIdModel} from '../models/userModel.js';

/* eslint-disable require-jsdoc */
export async function createService(data) {
  console.log('UserCreate service');
  const payLoad = await createModel(data);

  return payLoad;
};

export async function getByIdService(data) {
  console.log('UserCreate service');
  const payLoad = await getByIdModel(data);

  return payLoad;
};
