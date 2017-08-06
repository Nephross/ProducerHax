// Middleware for auth

const co = require('co');
const HttpError = require('./../utils/http-error');
const jwt = require('jwt');
const jwtSecret = process.env.JWT_SECRET;

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
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtSecret, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    throw new HttpError('Unauthorized', 'Unauthorized', 401);
  }
}

module.exports = {
  extractIP: extractIP,
  authenticateJWT: authenticateJWT
};
