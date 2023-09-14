/* eslint-disable require-jsdoc */
import createService from '../services/userService.js';

export default async function createController(req, res) {
  console.log('UserCreate controller');
  const data = req.body;
  const user = await createService(data);
  if (user.message) {
    const {code, message} = sales;
    return res.status(code).json({message});
  }

  return res.status(201).json({message: user});
};


