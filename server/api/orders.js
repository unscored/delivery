'use strict';

const models = require('../models');
const errors = require('../utils/errors');
const helpers = require('../utils/helpers');

module.exports = {
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
  },
  getOrders: async (params, callback) => {
    try {
      const query = `
        select
          o.id
        , c.name
        , c.phone
        , c.address
        , o.status
        , v.value as propValue
        , p.name as propName
        , v.price as propPrice
        , t.name as type
        , pr.name as productName
        , pr.price as productPrice
        , op.position
        , op.quantity
        , o.createdAtDate as date
        from ordersProducts op
          inner join orders o on op.orderId = o.id
          inner join clients c on o.clientId = c.id
          inner join \`values\` v on op.valueId = v.id
          inner join properties p on v.propertyId = p.id
          inner join types t on p.typeId = t.id
          inner join products pr on op.productId = pr.id;
      `;

      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT
      });

      const orders = helpers.prepareOrders(result);

      callback(null, orders);
    } catch (ex) {
      console.log('api/orders.js | getOrders | exception:', ex);
      callback(ex);
    }
  }
};
