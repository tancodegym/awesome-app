import {call, race, delay} from 'redux-saga/effects';

// //Watcher
export default function* main() {
  try {
    yield call(raceTask);
  } catch (err) {
    console.log(err);
  }
}
/*Blocking thread */
function* raceTask(): any {
  let winner = null;
  const raceResult = yield race({
    task: call(randomTask),
    cancel: call(cancelTask),
  });
  winner = raceResult;
  console.log('Winner: ', winner);
}

function* randomTask() {
  yield delay(1000);
  const random = Math.random();

  console.log('Random value: ', random);

  return random;
}

function* cancelTask() {
  yield delay(200);
  console.log('Cancelled');

  return 'Cancelled';
}
