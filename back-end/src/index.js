import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

import {
  loginController,
  createController as registerController,
  getByIdController as userGetByIdController,
} from './controllers/userController.js';

import {createController as historyCreateController,
} from './controllers/chatHistoryController.js';

const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/register', registerController);
app.post('/login', loginController);

app.get('/user/:id', userGetByIdController);

app.post('/chat-history', historyCreateController);


app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
