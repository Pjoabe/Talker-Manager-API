const express = require('express');

const { readJson } = require('./talkers');

const app = express();

app.use(express.json());

const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talker = await readJson();
  return res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = await readJson();
  const { id } = req.params;
  let talkerID;
  talker.forEach((el) => {
    if (el.id === +id) {
      talkerID = el;
    }
  });
  if (!talkerID) {
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
    return;
  }
  res.status(200).json(talkerID);
});