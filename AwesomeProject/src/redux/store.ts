import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import RootSaga from './root.saga';
import coffeeSlice from './hot-coffee/hotcoffee.slice';
import orderSlice from './order-saga/order.slice';
import homeSlice from './effect/home.slice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    coffeeReducer: coffeeSlice,
    orderReducer: orderSlice,
    homeReducer: homeSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(RootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
