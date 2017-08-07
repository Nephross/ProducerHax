'use strict';

const co = require('co');
const HttpError = require('./../../lib/utils/http-error');
const userDAL = require('./../../lib/db/dal/users');

function createUser(inputUser, userRole) {
  return co(function *() {

  });
}

module.exports = {
  createUser: createUser
};
