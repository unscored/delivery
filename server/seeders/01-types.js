'use strict';

const data = require('../seeds/types');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('types', data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('types', null, {});
  }
};