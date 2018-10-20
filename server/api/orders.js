'use strict';

const models = require('../models');
const errors = require('../utils/errors');
const constants = require('../utils/constants');

module.exports = {
  getOrders: async (params, callback) => {
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
        group by
          o.id
          , c.name
          , c.phone
          , o.status;
      `;

      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
      });

      callback(null, result);
    } catch (ex) {
      console.log('api/orders.js | getOrders | exception:', ex);
      callback(ex);
    }
  },
  addOrder: async (params, callback) => {
    try {
      const result = {};
      let user = null;
      let order = null;

      user = await models.client.findOne({
        where: { phone: params.phone }
      });
  
      if (!user) {
        user = await models.client.create({
          name: params.name,
          phone: params.phone,
          address: params.address
        });
      }

      order = await models.order.create({
        notice: '',
        clientId: user.id
      });

      params.items.map((item, i) => {
        let position = i + 1;

        item.selectedPropsID.map(async (prop) => {
          await models.orderProduct.create({
            orderId: order.id,
            valueId: prop,
            productId: item.id,
            position,
            quantity: item.quantity,
          });
          return item;
        });
      });

      callback(null, result);
    } catch (ex) {
      console.log('api/orders.js | addOrder | exception:', ex);
      callback(ex);
    }
  }
};
