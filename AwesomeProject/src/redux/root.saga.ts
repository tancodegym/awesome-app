import {all, takeEvery, takeLatest} from 'redux-saga/effects';
import hotCoffee from './hot-coffee/hotcoffee.saga';
import iceCoffee from './ice-coffee/iceCoffee.saga';
import putOrder from './order-saga/order.saga';
import deleteOrder from './order-saga/delete.saga';
import forkSaga from './effect/fork.saga';
import raceSaga from './effect/racing.saga';
import channelSaga from './effect/action.channel';
import multicastChannelSaga from './effect/multicast.channel';
import uploadSaga from './effect/upload.saga';

const rootSaga = function* () {
  yield all([
    takeLatest('COFFEE_SLICE/getCoffee', hotCoffee),

    takeLatest('ORDER_SLICE/putOrder', putOrder),

    takeLatest('ORDER_SLICE/deleteOrder', deleteOrder),

    takeLatest('QUERY_ICE_COFFEE', iceCoffee),

    takeEvery('FORK', forkSaga),

    takeEvery('RACE', raceSaga),

    takeEvery('CREATE_CHANNEL', channelSaga),

    takeEvery('MULTICAST_CHANNEL', multicastChannelSaga),

    takeLatest('UPLOAD', uploadSaga),
  ]);

  // while (true) {
  //   const {payload} = yield take('LOGIN');
  //   console.log(
  //     'userName: ' + payload.userName + ', password: ' + payload.password,
  //   );
  //   yield take('LOGOUT');
  //   console.log('LOGOUT');
  // }
};
export default rootSaga;
