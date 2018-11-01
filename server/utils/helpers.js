
/**
 * 
 * @param {Array} data
 * 
 * @returns {Array}
 */
const prepareProducts = data => {
  const result = data.reduce((acc, item) => {
    const dublicateIndex = acc.findIndex((p => p.id === item.id));
    const { id, name, image, description, ...rest } = item;
    let properties = [];
    let itemProperties = null;
    let dublicateParamsIndex = null;
    const propItem = {
      id: rest.paramNameId,
      name:rest.paramName,
      values: [{
        id: rest.paramValueId,
        value: rest.paramValue,
        price: rest.paramPrice,
      }]
    }

    if (dublicateIndex < 0) {
      properties.push(propItem);
      acc.push({ id, name, image, description, properties });
    } else {
      itemProperties = acc[dublicateIndex].properties;
      dublicateParamsIndex = itemProperties.findIndex((p => p.id === rest.paramNameId));
      
      if (dublicateParamsIndex < 0) {
        itemProperties.push(propItem);
      } else {
        itemProperties[dublicateParamsIndex].values.push({
          id: rest.paramValueId,
          value: rest.paramValue,
          price: rest.paramPrice,
        });
      }
    }
    return acc;
  }, []);
  
  return result;
};

/**
 * 
 * @param {Array} data
 * 
 * @returns {Array}
 */
const prepareOrders = data => {
  const result = data.reduce((acc, item) => {
    let duplicateOrderIndex = acc.findIndex(o => item.id === o.id);
    const orderListItem = {
      type: item.type,
      name: item.productName,
      quantity: item.quantity,
      position: item.position,
      params: [{
        name: item.propName,
        value: item.propValue,
      }]
    };

    if (duplicateOrderIndex < 0) {
      acc.push({
        id: item.id,
        name: item.name,
        phone: item.phone,
        status: item.status,
        date: item.date,
        orderList: [orderListItem],
      });
    } else {
      let duplicateProductIndex = acc[duplicateOrderIndex].orderList.findIndex(p => item.position === p.position);

      if (duplicateProductIndex < 0) {
        acc[duplicateOrderIndex].orderList.push(orderListItem);
      } else {
        acc[duplicateOrderIndex].orderList[duplicateProductIndex].params.push({
          name: item.propName,
          value: item.propValue,
        });
      }
      
    }
    return acc;
  }, []);

  return result
};

module.exports = {
  prepareProducts,
  prepareOrders,
}