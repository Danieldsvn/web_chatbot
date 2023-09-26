import 'dotenv/config';
import express from 'express';


const app = express();
app.use(express.json());

import {
  createController as userCreateController,
  getByIdController as userGetByIdController,
} from './controllers/userController.js';

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', userCreateController);

app.get('/user/:id', userGetByIdController);

// app.post('/chat-history', createController);


app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
