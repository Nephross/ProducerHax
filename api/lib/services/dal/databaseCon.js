'use strict';

const pg = require('pg');
const Pool = pg.Pool;

// by default the pool will use the same environment variables
// as psql, pg_dump, pg_restore etc:
// https://www.postgresql.org/docs/9.5/static/libpq-envars.html
console.log('Setting up the connection');
// you can optionally supply other values
const config = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER, // env var: PGUSER
  password: process.env.DB_PASSWORD, // env var: PGPASSWORD
  host: process.env.DB_HOST, // Server hosting the postgres database
  port: process.env.DB_PORT, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 5000 // how long a client is allowed to remain idle before being closed
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack);
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
console.log('Creating connection pool');
const pool = new Pool(config);

module.exports = pool;
