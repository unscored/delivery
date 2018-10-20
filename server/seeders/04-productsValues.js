'use strict';

const data = require('../seeds/productsValues');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('productsValues', data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('productsValues', null, {});
  }
};