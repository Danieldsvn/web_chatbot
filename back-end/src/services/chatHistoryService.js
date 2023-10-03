/* eslint-disable require-jsdoc */
// eslint-disable-next-line max-len
import {arrayStringToArrayObjects} from '../helpers/arrayStringToArrayObjects.js';
import {chatValid} from '../helpers/chatHistoryDataValidation.js';
import {createModel, getByIdModel} from '../models/chatHistoryModel.js';
import Papa from 'papaparse';

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

export async function getByIdService(data) {
  const payLoad = await getByIdModel(data);
  if (!payLoad) {
    return {statusCode: 404, message: 'User not found'};
  }
  if (payLoad.length === 0) {
    return {statusCode: 404, message: 'No conversation stored'};
  }
  const payLoadTreated = payLoad.map((conversation) => {
    return conversation.chat_history;
  });

  const arrayObjects = arrayStringToArrayObjects(payLoadTreated);

  const arrayCSV = arrayObjects.map((conversation) => {
    return Papa.unparse(conversation);
  });

  return {statusCode: 200, payLoad: arrayCSV};
};


