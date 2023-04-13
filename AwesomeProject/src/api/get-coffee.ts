import axios from 'axios';
import {Coffee} from '../../src/type/Coffee';
const URL_HOT_COFFEE = 'https://api.sampleapis.com/coffee/hot';
const URL_ICED_COFFEE = 'https://api.sampleapis.com/coffee/iced/';

// Passing configuration object to axios
export function getHotCoffee(): Promise<Coffee[]> {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: URL_HOT_COFFEE,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export function getIceCoffee(): Promise<Coffee[]> {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: URL_ICED_COFFEE,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
