/* eslint-disable @typescript-eslint/no-unused-vars */
import {cancel, delay, put, call, fork, takeLatest} from 'redux-saga/effects';
import {uploadDone, cancelUpload, uploadFile} from './home.slice';
import {Task} from 'redux-saga';

export default function* upload(): any {
  try {
    console.log('Uploading...');
    yield put(uploadFile());
    const task = yield fork(doSomeThing);
    yield takeLatest('CANCEL', cancelTask, task);
  } catch (err) {
    console.log(err);
  }
}

function* doSomeThing() {
  yield delay(5000);
  yield put(uploadDone());
  console.log('Uploaded');
}

function* cancelTask(task: Task<any>) {
  yield cancel(task);
  yield put(cancelUpload());
  console.log(task.isCancelled() ? 'Cancelled' : ' Not cancelled');
}
