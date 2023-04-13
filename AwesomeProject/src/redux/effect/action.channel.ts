import {take, actionChannel, delay, call} from 'redux-saga/effects';
import {buffers} from 'redux-saga';

interface ActionType {
  payload: Content;
  type: string;
}

interface Content {
  message: string;
}
export default function* _actionChannel(): any {
  console.log('Create Channel');

  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST', buffers.fixed(10)); // Send new messages = throw error

  while (true) {
    // 2- take from the channel
    const action: ActionType = yield take(requestChan);
    // 3- Note that we're using a blocking call
    yield call(handleRequest, action.payload);
    console.log(`Handle ${action.payload.message} Done`);
  }
}

function* handleRequest(content: Content) {
  //Handle
  console.log('Handling ' + content.message + '....');
  yield delay(2000);
}
