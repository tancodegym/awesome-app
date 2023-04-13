import {call, put, delay, select, fork, cancel} from 'redux-saga/effects';
import {orderFailure, setOrder} from './order.slice';
import {DeleteOrder} from '../action-type/actions';
import {RootState} from '../store';
import {Order} from '../../type/Order';
//Worker
function* deleteOrder(orders: Order[], id: number) {
  console.log('Working');
  const newOrder: Order[] = updateOrder(id, orders);
  yield put(setOrder(newOrder));
}

// //Watcher
export default function* (action: DeleteOrder): any {
  try {
    const state: RootState = yield select();
    const orders: Order[] = state.orderReducer.order;
    const id = action.payload;
    yield call(deleteOrder, orders, id);
    console.log('Delete Order Success');
  } catch (err) {
    console.log(err);
    yield put(orderFailure(err));
  }
}

function updateOrder(id: number, orders: Order[]): Order[] {
  // const orderList: Order[] = [...order];
  const orderList: Order[] = [];
  try {
    let order: Order;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id !== id) {
        orderList.push(orders[i]);
      } else {
        order = orders[i];
        order.quantity = 0;
        orderList.push(order);
      }
    }
  } catch (err) {
    console.log(err);
  }
  return orderList;
}
