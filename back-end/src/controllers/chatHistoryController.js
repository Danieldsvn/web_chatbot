/* eslint-disable require-jsdoc */

import {createService} from '../services/chatHistoryService.js';


export async function createController(req, res) {
  const data = req.body;
  const result = await createService(data);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};
