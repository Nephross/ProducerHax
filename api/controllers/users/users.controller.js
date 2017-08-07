'use strict';

const co = require('co');
const HttpError = require('./../../lib/utils/http-error');
const userDAL = require('./../../lib/db/dal/users');

function createUser(inputUser, ip, userRole) {
  return co(function *() {
    // Sanitise input?
    // store the user in db
    // generate jwt and login the user
    // this includes creating a loging attempt
  });
}

module.exports = {
  createUser: createUser
};
