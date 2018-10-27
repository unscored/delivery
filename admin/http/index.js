import axios from 'axios';

import { BASE_URL } from '../constants';

export default class Http {
  static defaultBody = {
    tid: 1,
    type: "rpc",
    data: [{}],
  }

  static post = (params = {}) => {
    const body = { ...Http.defaultBody, ...params }
    const watcher = new Promise((resolve, reject) => {

      const onSuccess = response => {
        if (response.data && response.data[0].result && !response.data[0].result.code) {
          resolve(response.data[0].result);
        } else {
          reject(response.data[0].result);
        }
      }
      const onError = error => {
        console.log("HTTP", error);
        reject(error);
      };
 
      axios.post(BASE_URL, body).then(onSuccess).catch(onError);
    });
 
    return watcher;
  }
}