/* eslint-disable @typescript-eslint/no-unused-vars */
import {CallEffect, cancel, delay, fork, spawn} from 'redux-saga/effects';

/* FORK MODEL: */
export default function* () {
  try {
    console.log('Fork Effect');
    /* DIFFERENT FROM yield* and yield */
    yield* todo(); // yield todo();
  } catch (err) {
    console.log(err);
  }
}
/* Fork Model - Non-Blocking thread */
// function* todo() {
//   yield fork(doSomeThing, 'Task 1');
//   yield fork(doSomeThing, 'Task 2');
//   yield fork(doSomeThing, 'Task 3');
//   yield fork(doSomeThing, 'Task 4');
//   yield fork(doSomeThing, 'Task 5');
//   console.log('Done All Task');
// }

/* Spawn Model */
function* todo(): any {
  const task1 = yield spawn(doSomeThing, 'Task 1');
  const task2 = yield spawn(doSomeThing, 'Task 2');
  const task3 = yield spawn(doSomeThing, 'Task 3');
  const task4 = yield spawn(doSomeThing, 'Task 4');
  const task5 = yield spawn(doSomeThing, 'Task 5');
  console.log('Done all tasks');
}

function* doSomeThing(task: string) {
  /* Case Error */
  if (task === 'Task 3') {
    throw new Error(`${task} Error`);
  }
  yield delay(5000);
  console.log('Done' + task);
}
