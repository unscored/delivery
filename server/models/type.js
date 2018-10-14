'use strict';

const errors = require('../utils/errors');

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('type', {
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
    tableName: 'types',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.hasMany(models.product, {
      as: 'products',
      sourceKey: 'id',
      foreignKey: 'typeId'
    });
    Model.hasMany(models.property, {
      as: 'properties',
      sourceKey: 'id',
      foreignKey: 'typeId'
    });
  };

  return Model;
};
