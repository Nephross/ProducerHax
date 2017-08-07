'use strict';

const co = require('co');
const DAL = require('./../../lib/db/dal/auth');
const authService = require('./../../lib/services/auth');
const HttpError = require('./../../lib/utils/http-error');

function login(userName, password, ip) {
  return co(function *() {
    // STUB
    // check login attempts - auth service?
    const loginAttempts = yield DAL.checkLoginAttempts(userName);

    if (loginAttempts > 3) {
      DAL.createLoginAttempt(userName, ip, false);
      throw HttpError('Unautorized', 'Too many attmepts, try again in 10minutes', 401);
    } else {
      const user = yield DAL.userLogin(userName);
      if (authService.comparePassword(password, user.salt, user.pwHash)) {
        DAL.createLoginAttempt(userName, ip, true);
        const jwtToken = authService.createJWT(user);
        return {user: user, token: jwtToken};
      } else {
        DAL.createLoginAttmpt(userName, ip, false);
        throw new HttpError('Unauthorized', 'Wrong password or username', 401);
      }
    }
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
