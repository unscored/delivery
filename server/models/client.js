'use strict';

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('client', {
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
      allowNull: false
    },
    phone: {
      type: dataTypes.STRING,
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
    tableName: 'clients',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.hasMany(models.order, {
      as: 'orders',
      sourceKey: 'id',
      foreignKey: 'clientId'
    });
  };

  return Model;
};
