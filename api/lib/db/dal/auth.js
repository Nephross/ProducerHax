'use strict';
const co = require('co');
const moment = require('moment');
const pg = require('pg');
const client = new pg.Client();
const conPool = require('./../databaseCon');

function checkLoginAttempts(userName) {
  return co(function *() {
    conPool.connect((err, client, done) => {
      if (err) {
        return err;
      } else {
        let query = client.query('SELECT * FROM phblogdb.sp_read_countattempts($1)', [userName], (err, result) => {
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

function userLogin(userName) {
  return co(function *() {
    conPool.connect((err, client, done) => {
      if (err) {
        return err;
      } else {
        let query = client.query('SELECT * FROM phblogdb.sp_read_userlogin($1)', [userName], (err, result) => {
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

function createLoginAttempt(userName, ip, success) {
  return co(function *() {
    conPool.connect((err, client, done) => {
      if (err) {
        return err;
      } else {
        const timeStamp = moment().format();
        let query = client.query('SELECT * FROM phblogdb.sp_create_loginattampt($1, $2, $3, $4)', [userName, timeStamp, ip, success], (err, result) => {
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
  checkLoginAttempts: checkLoginAttempts,
  userLogin: userLogin,
  createLoginAttempt: createLoginAttempt
};
