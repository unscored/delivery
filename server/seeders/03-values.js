'use strict';

const data = require('../seeds/values');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('values', data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('values', null, {});
  }
};