'use strict';

const co = require('co');
const authDAL = require('./../../lib/db/dal/auth');
const userRoleDAL = require('./../../lib/db/dal/userRoles');
const authService = require('./../../lib/services/auth');
const HttpError = require('./../../lib/utils/http-error');

function login(userName, password, ip) {
  return co(function *() {
    // STUB
    // check login attempts - auth service?
    const loginAttempts = yield authDAL.checkLoginAttempts(userName);
    // check if the username has been attempted too many times in the last 10 minutes
    if (loginAttempts > 3) {
      // if it has, then an error is thrown to the error handler and the attempt is logged
      authDAL.createLoginAttempt(userName, ip, false);
      throw HttpError('Unautorized', 'Too many attempts, try again in 10 minutes', 401);
    } else {
      const user = yield authDAL.userLogin(userName);
      if (authService.comparePassword(password, user.salt, user.pwHash)) {
        authDAL.createLoginAttempt(userName, ip, true);
        const userRole = yield userRoleDAL.getUserRole(user.fk_userrole);
        const jwtToken = authService.createJWT({userId: user.id, userRole: userRole.userrole});
        return {user: user, token: jwtToken};
      } else {
        authDAL.createLoginAttmpt(userName, ip, false);
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
