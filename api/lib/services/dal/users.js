'use strict';

var pg = require('pg');
var client = new pg.Client();
var conPool = require('./databaseCon');

var checkLoginAttempts = function(err, data) {

  return new Promise((resolve, reject) => {
    // reject and resolve are functions provided by the Promise
    // implementation. Call only one of them.

    // Do your logic here - you can do WTF you want.:)
    if (err) {
      return reject(err);
    }

    conPool.connect(function(err, client, done) {
      if (err) {
        return reject(err);
      }

      console.log("Preparing query");

      let query = client.query('SELECT * FROM phblogdb.sp_read_countattempts($1)', [data.arg1], (err, result) => {

        if (err) {
          return reject(err);
        }
        //call `done()` to release the client back to the pool
        done();

      });

      query.on('end', (result) => {
        //fired once and only once, after the last row has been returned and after all 'row' events are emitted
        //in this example, the 'rows' array now contains an ordered set of all the rows which we received from postgres
        console.log("Query end-------");
        console.log(result.rows[0].sp_read_countattempts);

        return resolve(result.rows[0].sp_read_countattempts);

      });

    });

    conPool.on('error', function(err, client) {
      // if an error is encountered by a client while it sits idle in the pool
      // the pool itself will emit an error event with both the error and
      // the client which emitted the original error
      // this is a rare occurrence but can happen if there is a network partition
      // between your application and the database, the database restarts, etc.
      // and so you might want to handle it and at least log it out
      return reject(err);

    });
  });
}

module.exports = {
  checkLoginAttempts: checkLoginAttempts
};
