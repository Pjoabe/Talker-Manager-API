const emailTest = (req, res, next) => {
  const { email } = req.body;
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (!email) {
      res.status(400).json({
          message: 'O campo "email" é obrigatório',
          }); 
      return;
  }

  if (!regex.test(email)) {
      res.status(400).json({
          message: 'O "email" deve ter o formato "email@email.com"',
        });
  }

  next();
};

const passwordTest = (req, res, next) => {
  const { password } = req.body;
  const FIVE = 5;
  if (!password) {
      res.status(400).json({
          message: 'O campo "password" é obrigatório',
        }); 
      return;
  }

  if (password.length <= FIVE) {
     res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
     }); 
  }

  next();
};

module.exports = { emailTest, passwordTest };