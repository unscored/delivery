'use strict';

process.argv.some(arg => {
  const params = arg.split('=');

  if (params && params[0] && (params[0] === 'env')) {
    process.env.NODE_ENV = params[1].trim().toLowerCase();
    return true;
  }
});

let config = (process.env.NODE_ENV === 'production')
              ? require('./prod.json')
              : require('./dev.json');

try {
  config = require('deepmerge')(config, require('./local.json'));
} catch (err) {}

module.exports = config;
