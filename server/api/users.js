'use strict';

const models = require('../models');
const errors = require('../utils/errors');
var jwt = require('jsonwebtoken');

const generateError = message => ({
  success: false,
  data: message
});

module.exports = {
  login: async (params, callback) => {
    try {
      let result = null;
      let token = null;
      const user = await models.user.findOne({
        where: { name: params.name }
      });

      if (!user) {
        result = generateError("User not exist");
      } else if (user && params.password === user.password) {
        token = jwt.sign({ name: params.name }, 'secretKey');
        result = {
          name: params.name,
          token,
        };
      } else {
        result = generateError("Invalid password");
      }

      callback(null, result);
    } catch (ex) {
      console.log('api/users.js | login | exception:', ex);
      callback(ex);
    }
  }
  
};
