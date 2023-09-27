/* eslint-disable require-jsdoc */
import {createModel} from '../models/chatHistoryModel.js';

export async function createService(data) {
  const payLoad = await createModel(data);
  if (!payLoad) {
    return {statusCode: 500, message: 'Conversation was not stored'};
  }
  return {statusCode: 201, payLoad: payLoad};
};
