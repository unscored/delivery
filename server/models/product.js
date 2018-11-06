'use strict';

const errors = require('../utils/errors');

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('product', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    name: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: {
        msg: errors.recordAlreadyExists()
      }
    },
    image: {
      type: dataTypes.STRING,
    },
    description: {
      type: dataTypes.TEXT
    },
    price: {
      type: dataTypes.DECIMAL(10, 0),
      allowNull: false
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
    tableName: 'products',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.belongsTo(models.type, {
      targetKey: 'id',
      foreignKey: 'typeId',
      allowNull: false
    });
    Model.hasMany(models.orderProduct, {
      as: 'ordersProducts',
      sourceKey: 'id',
      foreignKey: 'productId'
    });
    Model.hasMany(models.productValue, {
      as: 'productsValues',
      sourceKey: 'id',
      foreignKey: 'productId'
    });
  };

  return Model;
};
