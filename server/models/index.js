'use strict';

const path = require('path');
const Sequelize = require('sequelize');
require('sequelize-hierarchy')(Sequelize);
const {database} = require('../config');

let sequelize = {};
const db = {};

try {
  sequelize = new Sequelize(
    database.database || null,
    database.username || null,
    database.password || null,
    database
  );

  // Add to this array all filenames from current folder
  const models = [
    'client',
    'order',
    'orderProduct',
    'productValue',
    'product',
    'property',
    'value',
    'type',
    'user',
  ];

  models.forEach(modelName => {
    const model = sequelize.import(path.join(__dirname, modelName));
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });
} catch (ex) {
  console.log('models/index.js | exception:', ex);
}

db.sequelize = sequelize;

module.exports = db;