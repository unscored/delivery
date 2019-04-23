'use strict';

const models = require('../models');
const errors = require('../utils/errors');
const helpers = require('../utils/helpers');
const sms = require('../utils/sms');

module.exports = {
  addOrder: async (params, callback) => {
    try {
      const result = {};
      let user = null;

      user = await models.client.findOne({
        where: { phone: params.phone }
      });

      if (user) {
        await user.update({
          name: params.name,
        });
      } else {
        user = await models.client.create({
          name: params.name,
          phone: params.phone
        });
      }

      await models.order.create({
        notices: '',
        clientId: user.id,
        address: params.address,
        items: params.items
      });

      sms.send();

      callback(null, result);
    } catch (ex) {
      console.log('api/orders.js | addOrder | exception:', ex);
      callback(ex);
    }
  },
  updateOrder: async (params, callback) => {
   try {
      let result = {};
      let order = null;

      order = await models.order.findOne({
        where: { id: params.id }
      });

      if (order) {
        await order.update({
          address: params.address,
          status: params.status,
        });
      }
      callback(null, result);
    } catch (ex) {
      console.log('api/orders.js | updateOrder | exception:', ex);
      callback(ex);
    }
  },
  getOrders: async (params, callback) => {
    try {
      const orders = await models.order.findAll({
        order: [['createdAtDate', 'DESC']],
        include: [
          {
            model: models.client,
            as: 'client',
            attributes: ['name', 'phone']
          }
        ]
      });

      callback(null, orders);
    } catch (ex) {
      console.log('api/orders.js | getOrders | exception:', ex);
      callback(ex);
    }
  }
};
