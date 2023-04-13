import {call, put, select} from 'redux-saga/effects';
import {orderFailure, setOrder} from './order.slice';
import {DeleteOrder, PutOrder} from '../action-type/actions';
import {RootState} from '../store';
import {Order} from '../../type/Order';
//Worker
function* working(order: Order[]) {
  yield put(setOrder(order));
}

//Watcher
export default function* watching(action: PutOrder): any {
  console.log('ORDER SAGA');
  try {
    const state: RootState = yield select();
    const orders: Order[] = state.orderReducer.order;
    const id = action.payload.id;
    const quantity = action.payload.quantity;
    let newOrder: Order[] = updateOrder(id, orders, quantity);
    yield call(working, newOrder);
  } catch (err) {
    console.log(err);
    yield put(orderFailure(err));
  }
}
function updateOrder(id: number, orders: Order[], quantity: number): Order[] {
  // const orderList: Order[] = [...order];
  const orderList: Order[] = [];
  try {
    let order: Order;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id !== id) {
        orderList.push(orders[i]);
      } else {
        order = orders[i];
        order.quantity = order.quantity + quantity;
        orderList.push(order);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return orderList;
}
