'use strict';

const co = require('co');
const HttpError = require('./../../lib/utils/http-error');

function login(userName, password, ip) {
  return co(function *() {
    // STUB
    // check login attempts - auth service?
    // if (login attempts are good)
    // login - sign jwt and respond with user or respond with unauthenticated
    // else  - return http error with too many login attempts
  });
}

function logout(userId) {
  return co(function *() {
    // STUB
    // do I stricktly need this? is it enough to just drop the jwt in the frontend?
  });
}

module.exports = {
  login: login,
  logout: logout
};
