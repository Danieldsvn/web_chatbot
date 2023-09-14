/* eslint-disable require-jsdoc */
import {createService, getByIdService} from '../services/userService.js';

export async function createController(req, res) {
  console.log('UserCreate controller');
  const data = req.body;
  const result = await createService(data);
  if (result.message) {
    const {code, message} = sales;
    return res.status(code).json({message});
  }

  return res.status(201).json(result);
};

export async function getByIdController(req, res) {
  console.log('UserCreate controller');
  const {id} = req.params;
  const result = await getByIdService(id);
  if (result.message) {
    const {code, message} = sales;
    return res.status(code).json({message});
  }

  return res.status(201).json(result);
};


