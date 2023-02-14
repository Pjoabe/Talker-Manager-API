const express = require('express');

const { v4: uuidv4 } = require('uuid');

const { emailTest, passwordTest } = require('./middlewares/loginAndPasswordValidation');

const { readJson, pushNewData } = require('./talkers');

const { 
  testToken, testName, testAge, testTalk, testWatchedAt, testRate,
} = require('./middlewares/talkerAllValidations');

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

app.post('/talker', testToken, testName, testAge, testTalk, testWatchedAt,
testRate, 
  async (req, res) => {
    const { name, age, talk } = req.body;
  const file = await readJson();
  const newData = { id: (file.length += 1), name, age, talk };
  await pushNewData(newData);
  res.status(201).json(newData); 
});

app.put('/talker/:id', testToken, testTalk, testName, testAge, 
testWatchedAt, testRate, async (req, res) => {
  const { id } = req.params;
  const { age, talk, name } = req.body;
  const data = await readJson();
  const talkerID = data.reduce((acc, e) => {
    if (e.id === +id) {
      return e;
    }
    return acc;
  }, null);
  const newData = { ...talkerID, talk: { ...talk }, name, age };
  await pushNewData(newData);
  res.status(200).json(newData);
});
