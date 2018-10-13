'use strict';

module.exports = {
  development: require('./dev.json').database,
  test: require('./dev.json').database,
  production: require('./prod.json').database
};
