import 'dotenv/config';
import express from 'express';


const app = express();
app.use(express.json());

import create from './controllers/userController.js';
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', create);


app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
