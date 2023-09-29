/* eslint-disable require-jsdoc */
import {
  createService,
  getByIdService,
  loginService} from '../services/userService.js';

export async function createController(req, res) {
  const data = req.body;
  const result = await createService(data);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};

export async function loginController(req, res) {
  const data = req.body;
  const result = await loginService(data);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};

export async function getByIdController(req, res) {
  const {id} = req.params;

  const result = await getByIdService(id);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};


