'use strict';

const models = require('../models');

(async () => {
  try {
    await models.sequelize.sync({ force: true });
    process.exit(0);
  } catch (ex) {
    console.error('An error occurred while creating the table:', ex);
    process.exit(-1);
  }
})();
