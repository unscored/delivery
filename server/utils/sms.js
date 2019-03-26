'use strict'

const fetch = require('node-fetch');
const { sms, ESPUTNIK_SEND_SMS_URL, ESPUTNIK_LOGIN, ESPUTNIK_PASSWORD } = require('../config');

const send = () => {
  fetch(ESPUTNIK_SEND_SMS_URL, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(`${ESPUTNIK_LOGIN}:${ESPUTNIK_PASSWORD}`).toString('base64')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from : "reklama",
      text : "Поступил новый заказ! Перейдите в админку для просмотра деталей заказа",
      phoneNumbers : [...sms.numbers]
    })
  });
}

module.exports = {
  send
};
