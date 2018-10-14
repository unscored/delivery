'use strict';

const models = require('../models');
const errors = require('../utils/errors');

module.exports = {
  getList2: async (params, callback) => {
    try {
      const query = `
        select
          o.id
        , c.name
        , c.phone
        , o.status
        , SUM(v.price) as total
        from ordersProducts
          inner join orders o on ordersProducts.orderId = o.id
          inner join clients c on o.clientId = c.id
          inner join \`values\` v on ordersProducts.valueId = v.id
        where
          c.phone = :phone
        group by
          o.id
          , c.name
          , c.phone
          , o.status;
      `;

      const result = await models.sequelize.query(query, {
        replacements: {
          'phone': '+38 (000) 123-44-44'
        },
        type: models.sequelize.QueryTypes.SELECT
      });

      callback(null, result);
    } catch (ex) {
      console.log('api/products.js | get | exception:', ex);
      callback(ex);
    }
  }
};
