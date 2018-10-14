'use strict';

const data = require('../seeds/properties');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('properties', data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  }
};