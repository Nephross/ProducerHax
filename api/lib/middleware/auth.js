// Middleware for auth

const co = require('co');

function extractIP(req, res, next) {
  let ip = req.headers['x-forwarded-for'];
  if (ip) {
    let list = ip.split(',');
    ip = list[0];
  } else {
    ip = req.connection.remoteAddress;
  }
  req.ip = ip;
  next();
};

function authenticateJWT(req, res, next) {
  let authorized = false;
  if (authorized) {
    // STUB
    return next();
  } else {
    res.status(401);
    return next('Unauthorized');
  }
}

module.exports = {
  extractIP: extractIP,
  authenticateJWT: authenticateJWT
};
