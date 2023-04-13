import {call, put, retry} from 'redux-saga/effects';
import {getHotCoffee} from '../../api/get-coffee';
import {Coffee} from '../../type/Coffee';
import {Order} from '../../type/Order';
import {getCoffeeFailure, getCoffeeSuccess} from './hotcoffee.slice';
import {GetCoffee} from '../action-type/actions';
import {setOrder} from '../order-saga/order.slice';
//Worker
function* working(coffees: Coffee[]) {
  yield put(getCoffeeSuccess(coffees));
  yield put(setOrder(convertData(coffees)));
}
//Watcher
export default function* watching(action: GetCoffee) {
  console.log('SAGA Action', action);
  try {
    const data: Coffee[] = yield call(getHotCoffee);
    /* Retry request */
    // const data: Coffee[] = yield retry(3, 5000, getHotCoffee);
    // console.log(data);
    yield call(working, data);
    console.log('WORKING DONE');
  } catch (err) {
    yield put(getCoffeeFailure(err));
  }
}

function convertData(array: Coffee[]): Order[] {
  const list: Order[] = [];
  let order: Order;
  array.forEach(coffee => {
    order = new Order(
      coffee.id,
      coffee.title,
      coffee.image,
      0,
      coffee.ingredients,
    );
    list.push(order);
  });
  return list;
}
