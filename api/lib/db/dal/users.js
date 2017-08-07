'use strict';
const co = require('co');
const moment = require('moment');
const pg = require('pg');
const client = new pg.Client();
const conPool = require('./../databaseCon');

function createUser(userName, email, salt, hash, profilepicpath, userRole) {
  return co(function *() {
    conPool.connect((err, client, done) => {
      if (err) {
        return err;
      } else {
        const timeStamp = moment().format();
        let query = client.query('SELECT * FROM phblogdb.sp_create_user($1, $2, $3, $4, $5, $6, $7)', [userName, email, timeStamp, salt, hash, profilepicpath, userRole], (err, result) => {
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
};
