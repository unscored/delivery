'use strict';

const models = require('../models');

module.exports = {
  getList: async (params, callback) => {
    try {
      let recordsArray = [];

      callback(null, recordsArray);
    } catch (ex) {
      console.log('api/products.js | get | exception:', ex);
      callback(ex);
    }
  }
};
