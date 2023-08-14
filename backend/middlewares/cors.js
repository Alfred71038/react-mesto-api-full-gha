const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'http://alfred71038.nomoreparties.co',
  'https://alfred71038.nomoreparties.co',
  'http://backalfred71038.nomoreparties.co',
  'https://backalfred71038.nomoreparties.co',
  'http://localhost:3001',
  'https://localhost:3001',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {

    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {

    res.header('Access-Control-Allow-Methods', ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  return next();
};
