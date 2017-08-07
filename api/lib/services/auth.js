'use strict';

const co = require('co');
const jwt = require('jsonwebtoken');
// Import node built in crypto library
const crypto = require('crypto');
const HttpError = require('./../utils/http-error');

// returns a hashed password
function hashPassword(salt, password) {
  return co(function *() {
    // Recursive hashing algorithm to reduce effeciency of brute force attacks
    crypto.pbkdf2(password, salt, 200000, 1024, 'sha512', (err, key) => {
      if (err) {
        return Promise.reject(err);
      } else {
        return Promise.resolve(key.toString('base64'));
      }
    });
  });
};

// Returns a secure-random 64byte base64 String
function generateSecureSalt() {
  return co(function *() {
    try {
      const salt = crypto.randomBytes(64).toString('base64');
      return salt;
    } catch (err) {
      return err;
    }
  });
};

function comparePassword(password, salt, pwHash) {
  return co(function *() {
    // Hash inputted password
    const tryHash = yield hashPassword(salt, password);
    if (tryHash === pwHash) {
      return true;
    } else {
      return false;
    }
  });
};

function createJWT(user) {
  return co(function *() {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresInMinutes: 1440 // expires in 24 hours
    });
    return token;
  });
}

module.exports = {
  hashPassword: hashPassword,
  generateSecureSalt: generateSecureSalt,
  comparePassword: comparePassword,
  createJWT: createJWT
};
