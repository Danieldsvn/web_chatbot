const express = require('express');
const app = express();
PORT = 3001 || process.env.PORT;
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
