const allowedCors = [
  'https://alfred71038.nomoreparties.co',
  'http://alfred71038.nomoreparties.co',
  'https://backalfred71038.nomoreparties.co',
  'http://backalfred71038.nomoreparties.co',
  'http://localhost:3000',
];

const ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  console.log(origin);
  const { method } = req;
  console.log(method);
  const requestHeaders = req.headers['access-control-request-headers'];
  console.log(requestHeaders);
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
}