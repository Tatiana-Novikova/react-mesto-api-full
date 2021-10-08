const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    throw new UnauthorizedError('Необходима авторизация');
  } else {
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    ); ;
    let payload;
    try {
      payload = jwt.verify(token, 'JWT_SECRET');
    } catch (err) {
      throw new UnauthorizedError('Необходима авторизация');
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
