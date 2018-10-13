'use strict';

const models = require('../models');

module.exports = {
  getList: async (params, callback) => {
    try {
      const recordsArray = await models.product.findAll();

      callback(null, recordsArray);
    } catch (ex) {
      console.log(`api/${__filename} | get | exception:`, ex);
      callback(ex);
    }
  }
};
