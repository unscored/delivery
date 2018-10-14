'use strict';

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('value', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
      }
    },
    value: {
      type: dataTypes.STRING,
      allowNull: false
    },
    price: {
      type: dataTypes.DECIMAL(10, 2),
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
    tableName: 'values',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.belongsTo(models.property, {
      targetKey: 'id',
      foreignKey: 'propertyId',
      required: true
    });
    Model.hasMany(models.orderProduct, {
      as: 'ordersProducts',
      sourceKey: 'id',
      foreignKey: 'valueId'
    });
  };

  return Model;
};
