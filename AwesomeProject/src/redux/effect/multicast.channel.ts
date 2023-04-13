/* eslint-disable @typescript-eslint/no-unused-vars */
import {multicastChannel, channel} from 'redux-saga';
import {take, fork, call, put} from 'redux-saga/effects';

export default function* main(): any {
  console.log('Create Multicast Channel');
  /* create a multicastChannel to queue incoming requests */
  const _channel: ReturnType<typeof multicastChannel> = yield call(
    multicastChannel,
  );
  // const _channel = yield call(channel);
  /* fork different workers */
  yield fork(logWorker, _channel);
  yield fork(mainWorker, _channel);

  while (true) {
    const {payload} = yield take('REQUEST');
    yield put(_channel, payload);
  }
}

function* logWorker(_channel: any): any {
  while (true) {
    /* Pattern '*' for simplicity */
    const payload = yield take(_channel, '*');
    // const payload: ReturnType<typeof channel> = yield take(_channel);

    /* Log the request somewhere.. */
    console.log('logWorker is doing :', payload);
  }
}

function* mainWorker(_channel: any): any {
  while (true) {
    // Pattern '*' for simplicity
    const payload = yield take(_channel, '*');
    // const payload: ReturnType<typeof channel> = yield take(_channel);

    /* Process the request */
    console.log('mainWorker is doing : ', payload);
  }
}
