/* eslint-disable require-jsdoc */

import {getByIdModel} from '../models/userModel.js';


export async function chatValid(data) {
  if (!data.userId || data.userId.length === 0) {
    return {statusCode: 400, message: 'User ID is missing'};
  }
  if (!data.conversation || data.conversation.length === 0) {
    return {statusCode: 400, message: 'There is no conversation to store'};
  }

  const userExist = await getByIdModel(data.userId);
  if (!userExist) {
    return {statusCode: 404, message: 'User not found'};
  }

  return true;
}


