import {createSlice} from '@reduxjs/toolkit';
import {Order} from '../../type/Order';

const orders: Order[] = [];

export const orderSlice = createSlice({
  name: 'ORDER_SLICE',
  initialState: {
    order: orders,
    err: null,
  },
  reducers: {
    putOrder: (state, action) => {
      console.log(action);
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },

    deleteOrder: (state, action) => {
      console.log(action);
      console.log('Deleting Order');
    },
    cancelOrder: state => {
      console.log('Order cancelled');
      state.order = [];
      state.err = null;
    },
    orderFailure: (state, action) => {
      console.log('Order Failure');
      state.err = action.payload;
    },
  },
});
export const {putOrder, deleteOrder, setOrder, cancelOrder, orderFailure} =
  orderSlice.actions;
export default orderSlice.reducer;
