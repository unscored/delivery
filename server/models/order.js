'use strict';

const constants = require('../utils/constants');

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('order', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    status: {
      type: dataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: constants.validators.ORDER.STATUS.NEW,
      validate: {
        isIn: [[
          constants.validators.ORDER.STATUS.NEW,
          constants.validators.ORDER.STATUS.PROCESSING,
          constants.validators.ORDER.STATUS.READY,
          constants.validators.ORDER.STATUS.PAID,
          constants.validators.ORDER.STATUS.CLOSED,
          constants.validators.ORDER.STATUS.REJECTED,
          constants.validators.ORDER.STATUS.RETURNED
        ]]
      }
    },
    notices: {
      type: dataTypes.TEXT
    },
    createdAt: {
      type: dataTypes.VIRTUAL,
      get () {
        return +this.get('createdAtDate');
      },
      set (value) {
        this.set('createdAtDate', value);
      }
    },
    updatedAt: {
      type: dataTypes.VIRTUAL,
      get () {
        return +this.get('updatedAtDate');
      },
      set (value) {
        this.set('updatedAtDate', value);
      }
    },
    deletedAt: {
      type: dataTypes.VIRTUAL,
      get () {
        return +this.get('deletedAtDate');
      },
      set (value) {
        this.set('deletedAtDate', value);
      }
    }
  }, {
    tableName: 'orders',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.belongsTo(models.client, {
      targetKey: 'id',
      foreignKey: 'clientId',
      required: true
    });
    Model.hasMany(models.orderProduct, {
      as: 'ordersProducts',
      sourceKey: 'id',
      foreignKey: 'orderId'
    });
  };

  return Model;
};
