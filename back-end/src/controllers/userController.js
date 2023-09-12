/* eslint-disable require-jsdoc */


export default async function create(req, res) {
  console.log('UserCreate controller');
  // const data = req.body;
  // const sales = await create(data);
  // if (sales.message) {
  //   const {code, message} = sales;
  //   return res.status(code).json({message});
  // }

  return res.status(201).json({message: 'testando'});
};


