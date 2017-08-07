'use strict';
const co = require('co');
const moment = require('moment');
const pg = require('pg');
const client = new pg.Client();
const conPool = require('./../databaseCon');

function getUserRole(roleId) {
  return co(function *() {
    conPool.connect((err, client, done) => {
      if (err) {
        return err;
      } else {
        let query = client.query('SELECT * FROM phblogdb.sp_read_userroles($1)', [roleId], (err, result) => {
          if (err) {
            return err;
          }
          done();
        });

        query.on('end', (result) => {
          return result.rows[0];
        });
      }
    });
    conPool.on('error', function(err, client) {
      return err;
    });
  });
}

module.exports = {
  getUserRole: getUserRole
};
