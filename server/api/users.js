'use strict';

const models = require('../models');
const errors = require('../utils/errors');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (params, callback) => {
    try {
      const user = await models.user.findOne({
        where: {
          name: params.name
        }
      });

      if (!user || (user && user.password !== params.password)) {
        throw errors.unauthorized();
      }

      const result = {
        name: user.name,
        token: jwt.sign({ name: user.name }, 'secretKey'),
      };

      callback(null, result);
    } catch (ex) {
      console.log('api/users.js | login | exception:', ex);
      callback(ex);
    }
  }
  
};
