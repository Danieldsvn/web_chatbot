/* eslint-disable require-jsdoc */
import {createService, getByIdService} from '../services/userService.js';

export async function createController(req, res) {
  const data = req.body;
  const result = await createService(data);
  if (result.message) {
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};

export async function getByIdController(req, res) {
  const {id} = req.params;

  const result = await getByIdService(id);
  if (result.message) {
    console.log('result: ', result);
    return res.status(result.statusCode).json({message: result.message});
  }

  return res.status(result.statusCode).json(result.payLoad);
};

// export async function getByIdController(req, res) {
//   const {id} = req.params;
//   try {
//     const result = await getByIdService(id);
//     if (result.message) {
//       const {code, message} = sales;
//       return res.status(code).json({message});
//     }

//     return res.status(201).json(result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };


