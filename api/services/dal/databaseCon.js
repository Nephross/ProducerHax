'use strict';

var pg = require('pg');
var Pool = pg.Pool;


// by default the pool will use the same environment variables
// as psql, pg_dump, pg_restore etc:
// https://www.postgresql.org/docs/9.5/static/libpq-envars.html
console.log("Setting up the connection");
// you can optionally supply other values
var config = {
  database: 'producerhax_db',
  user: 'producerhax_client', //env var: PGUSER 
  password: 'f0cc13cee3621db6b4d85cead4a913fcf03216a8e833ba48f314cfe0f930ca42', //env var: PGPASSWORD 
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  max: 10, // max number of clients in the pool 
  idleTimeoutMillis: 5000, // how long a client is allowed to remain idle before being closed 
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
console.log("Creating connection pool");
var pool = new Pool(config);


module.exports = pool;



