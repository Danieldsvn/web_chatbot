import 'dotenv/config'
import express from 'express';
const app = express();

import create from './controllers/userController.js';
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/user', create);


app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
