
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
}

module.exports = {
  prepareProducts,
}