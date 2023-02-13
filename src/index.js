const express = require('express');

const { v4: uuidv4 } = require('uuid');

const { emailTest, passwordTest } = require('./middlewares/loginAndPasswordValidation');

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
  const talkerID = talker.reduce((acc, el) => {
    if (el.id === +id) {
      return el;
    }
    return acc;
  }, null);
  if (!talkerID) {
    res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
    return;
  }
  res.status(200).json(talkerID);
});

app.post('/login', emailTest, passwordTest, (req, res) => {
  const uuid = uuidv4();
  let token = '';
  for (let i = 0; i < uuid.length; i += 1) {
    if (uuid[i] !== '-') {
      token += uuid[i];
    }
    if (token.length === 16) {
      break;
    }
  }
  res.status(200).json({ token });
});
