'use strict';

module.exports = (sequelize, dataTypes) => {
  const Model = sequelize.define('orderProduct', {
    id: {
      type: dataTypes.UUID,
      defaultValue: dataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        isUUID: 4
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
    tableName: 'ordersProducts',
    createdAt: 'createdAtDate',
    updatedAt: 'updatedAtDate',
    deletedAt: 'deletedAtDate',
  });

  Model.associate = (models) => {
    Model.belongsTo(models.order, {
      targetKey: 'id',
      foreignKey: 'orderId',
      required: true
    });
    Model.belongsTo(models.product, {
      targetKey: 'id',
      foreignKey: 'productId',
      required: true
    });
    Model.belongsTo(models.value, {
      targetKey: 'id',
      foreignKey: 'valueId',
      required: true
    });
  };

  return Model;
};
