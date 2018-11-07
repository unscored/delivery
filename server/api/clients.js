'use strict';

const models = require('../models');
const errors = require('../utils/errors');

module.exports = {
  getClients: async (params, callback) => {
    try {
      const clients = await models.client.findAll({
        attributes: ['id', 'name', 'phone', 'address']
      });

      callback(null, clients);
    } catch (ex) {
      console.log('api/orders.js | getClients | exception:', ex);
      callback(ex);
    }
  }
};
