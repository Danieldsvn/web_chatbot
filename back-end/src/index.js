import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import {
  createController as userCreateController,
  getByIdController as userGetByIdController,
} from './controllers/userController.js';

import {createController as historyCreateController,
} from './controllers/chatHistoryController.js';

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', userCreateController);

app.get('/user/:id', userGetByIdController);

app.post('/chat-history', historyCreateController);


app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
