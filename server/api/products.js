'use strict';

const models = require('../models');
const errors = require('../utils/errors');
const helpers = require('../utils/helpers');

module.exports = {
  getProducts: async (params, callback) => {
    try {
      const query = `
        SELECT
          p.id
        , p.name
        , p.description
        , p.image
        , pr.id AS paramNameId
        , pr.name AS paramName
        , v.id AS paramValueId
        , v.value AS paramValue
        , v.price AS paramPrice
        FROM productsValues pv
        INNER JOIN products p ON p.id = pv.productId
        INNER JOIN \`values\` v ON v.id = pv.valueId
        INNER JOIN properties pr ON pr.id = v.propertyId
        ORDER BY v.value, p.name;
      `;

      const products = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
      });

      const result = helpers.prepareProducts(products);

      callback(null, result);
    } catch (ex) {
      console.log('api/products.js | get | exception:', ex);
      callback(ex);
    }
  }
  
};
