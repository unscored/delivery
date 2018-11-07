const crypto = require('crypto');

/**
 * 
 * @param {Array} data
 * 
 * @returns {Array}
 */
const prepareProducts = data => {
  const result = data.reduce((acc, item) => {
    const dublicateIndex = acc.findIndex((p => p.id === item.id));
    const { id, name, image, description, price, ...rest } = item;
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
      acc.push({ id, name, image, price, description, properties });
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
      price: (parseInt(item.productPrice, 10) * item.quantity) + (parseInt(item.propPrice, 10) * item.quantity),
      params: [{
        name: item.propName,
        value: item.propValue,
      }]
    };

    console.log(item.name, parseInt(item.productPrice, 10), parseInt(item.propPrice, 10), item.quantity);

    if (duplicateOrderIndex < 0) {
      acc.push({
        id: item.id,
        name: item.name,
        phone: item.phone,
        status: item.status,
        address: item.address,
        totalPrice: orderListItem.price,
        date: item.date,
        orderList: [orderListItem],
      });
    } else {
      let duplicateProductIndex = acc[duplicateOrderIndex].orderList.findIndex(p => item.position === p.position);

      if (duplicateProductIndex < 0) {
        acc[duplicateOrderIndex].orderList.push(orderListItem);
      } else {
        let prevPrice = acc[duplicateOrderIndex].orderList[duplicateProductIndex].price;
        let newPrice = prevPrice + (parseInt(item.propPrice, 10) * item.quantity);
        
        acc[duplicateOrderIndex].orderList[duplicateProductIndex].price = newPrice;
        acc[duplicateOrderIndex].totalPrice += newPrice
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

const generateHashAndSalt = (password) => {
  if (!password) {
    return {
      password_hash: null,
      password_salt: null
    };
  }

  const salt = crypto.randomBytes(64).toString('hex').slice(0, 64);
  const cryptedPassword = crypto.createHmac('sha512', salt).update(password).digest('hex');

  return {
    password_hash: cryptedPassword,
    password_salt: salt
  };
};

const isValid = (user, password) => {
  if (!user || (user && (!user.password_hash || !user.password_salt))) {
    return false;
  }

  const cryptedPassword = crypto.createHmac('sha512', user.password_salt).update(password).digest('hex');

  return user.password_hash === cryptedPassword;
}

module.exports = {
  prepareProducts,
  prepareOrders,
  password: {
    generateHashAndSalt,
    isValid
  }
}