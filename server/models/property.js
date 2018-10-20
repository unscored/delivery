'use strict';

const errors = require('../utils/errors');

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('property', {
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
    tableName: 'properties',
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
  };

  return Model;
};
