/*
    config.js for wdc-angular server file
*/
'use strict';
const fs = require('fs');
const configs = JSON.parse(fs.readFileSync('./env.json', 'utf8'));
(function() {
  const config = configs[process.env.NODE_ENV] || configs['development'];
  for (let envVar in config) {
    process.env[envVar] = config[envVar];
  }
})();
