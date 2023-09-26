/* eslint-disable require-jsdoc */
import {createService} from '../services/chat-historyService';

export async function createController(req, res) {
  const data = req.body;
  const result = await createService(data);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};
