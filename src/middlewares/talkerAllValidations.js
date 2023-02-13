const testToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
      res.status(401).json({
          message: 'Token não encontrado',
        });
      return;
  }

  if (token.length !== 16) {
      res.status(401).json({
          message: 'Token inválido',
        });
      return;
  }
  next();
};

const testName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
      res.status(400).json({
          message: 'O campo "name" é obrigatório',
        });
      return;
  }

  if (name.length < 3) {
      res.status(400).json({
          message: 'O "name" deve ter pelo menos 3 caracteres',
        });
      return;
  }
  next();
};

const testAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
      res.status(400).json({ message: 'O campo "age" é obrigatório' });
      return;
  }
  if (typeof age !== 'number') {
      res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
      return;
  }
  if (!Number.isInteger(age)) {
      res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
      return;
  }
  if (age <= 17) {
      res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
      return;
  }
  next();
};

const testTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
      res.status(400).json({ message: 'O campo "talk" é obrigatório' });
      return;
  }
  next();
};

const testWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt) {
      res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
      return; 
  }
  const regexDate = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/i;

  if (!regexDate.test(talk.watchedAt)) {
      res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
      return; 
  }
  next();
};

const testRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (typeof rate === 'undefined') {
    // por que negação num funfa aqui???
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    return;
  }
  if (!Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = { 
  testToken, 
  testName,
  testAge,
  testTalk,
  testWatchedAt,
  testRate,
};
