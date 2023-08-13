const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'http://alfred71038.nomoreparties.co',
  'http://backalfred71038.nomoreparties.co',
  'https://alfred71038.nomoreparties.co',
  'https://backalfred71038.nomoreparties.co',
  'http://localhost:3000',
  'http://localhost:3001',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    });
  }

  if (method === 'OPTIONS') {
    res.header({
      'Access-Control-Allow-Headers': requestHeaders,
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
    });
    return res.end();
  }
  next();
};

module.exports = cors;
