/* eslint-disable require-jsdoc */
import {chatValid} from '../helpers/chatHistoryDataValidation.js';
import {createModel} from '../models/chatHistoryModel.js';

export async function createService(data) {
  const chatOk = await chatValid(data);
  if (chatOk === true) {
    const payLoad = await createModel(data);
    if (!payLoad) {
      return {statusCode: 500, message: 'Conversation was not stored'};
    }
    return {statusCode: 201, payLoad: payLoad};
  }
  return chatOk;
};
