import {createModel} from '../models/userModel.js';

/* eslint-disable require-jsdoc */
export default async function createService(data) {
  console.log('UserCreate service');
  const payLoad = await createModel(data);

  return payLoad;
};
