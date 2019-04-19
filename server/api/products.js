'use strict';

const _ = require('lodash');
const cloudinary = require('cloudinary').v2;

const models = require('../models');
const errors = require('../utils/errors');
const { uploadFile } = require('../utils/functions');
const helpers = require('../utils/helpers');

module.exports = {
  getProducts: async (params, callback) => {
    try {
      const query = `
        SELECT
          p.id
        , p.name
        , p.price
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
  },
  updateProduct: async (params, callback) => {
    try {
      let result = {};
      let product = null;
      let cloudFile = null;
      let targetImage = '';

      product = await models.product.findOne({
        where: { id: params.id }
      });

      if (params.file !== params.image) {
        cloudFile = await uploadFile(params.file, { public_id: params.id });
        console.log(cloudFile);
        if (cloudFile.success) {
          targetImage = cloudFile.version;
        } else {
          throw errors.uploadImageFailed('Error occured while uploading image');
        }
      } else {
        targetImage = params.version;
      }

      if (product) {
        await product.update({
          name: params.name,
          price: params.price,
          description: params.description,
          image: targetImage,
        });
      } else {
        throw errors.recordNotFound('Product not found');
      }
  
      callback(
        null,
        { 
          data: {
            ..._.omit(params, ['file']),
            image: cloudinary.url(params.id, { version: targetImage, sign_url: true, quality: 'auto', fetch_format: 'auto' })
          }
        }
      );
    } catch (ex) {
      console.log('api/products.js | update | exception:', ex);
      callback(ex);
    }
  }
  
};
