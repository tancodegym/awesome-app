/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';

export function createActionTypeOnBeginning(key: string): string {
  return `${key}_BEGAN`;
}
export function createActionTypeOnFailure(key: string): string {
  return `${key}_FAILED`;
}
export function createActionTypeOnSuccess(key: string): string {
  return `${key}_SUCCESS`;
}
export function createActionTypeOnFinish(key: string): string {
  return `${key}_FINISHED`;
}

export function createAction(type: string): Function {
  return (
    payload: any = {},
    callbacks: Callbacks = {
      onBeginning: noop,
      onFailure: noop,
      onFinish: noop,
      onSuccess: noop,
    },
    options: any = {},
  ): UnfoldSagaAction => ({
    callbacks,
    options,
    payload,
    type,
  });
}
export function noop(): void {}

export default {
  noop,
};

export interface UnfoldSagaAction {
  callbacks: Callbacks;
  options: Option;
  payload: any;
  type: string;
}
export interface Callbacks {
  onBeginning: Function;
  onFailure: Function;
  onFinish: Function;
  onSuccess: Function;
}
export interface Handler {
  handler: () => {};
  key: string;
}
export interface Option {
  stateless: boolean;
}
// npm install --save redux-unfold-saga
// yarn add redux-unfold-saga
export function* unfoldSaga(
  {handler, key}: Handler,
  callbacks?: Callbacks,
  options?: Option,
): any {
  let data;
  const defaultCallbacks = {
    onBeginning: () => {},
    onFailure: (error: any) => {
      console.log(error);
    },
    onFinish: () => {},
    onSuccess: (result: any) => {
      console.log('DATA:', result);
    },
  };
  const defaultOptions = {
    stateless: false,
  };
  Object.assign(defaultCallbacks, callbacks);
  Object.assign(defaultOptions, options);
  try {
    if (defaultOptions.stateless === false) {
      yield put({type: createActionTypeOnBeginning(key)});
      yield call(defaultCallbacks.onBeginning);
    }
    //Callback
    data = yield call(handler);

    if (defaultOptions.stateless === false) {
      yield put({type: createActionTypeOnSuccess(key), payload: data});
      yield call(defaultCallbacks.onSuccess, data);
    }
  } catch (error) {
    if (defaultOptions.stateless === false) {
      yield put({type: createActionTypeOnFailure(key), payload: error});
      yield call(defaultCallbacks.onFailure, error);
    }
  } finally {
    yield call(defaultCallbacks.onFinish);
  }
  return data;
}
