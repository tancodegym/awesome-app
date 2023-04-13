import {createSlice} from '@reduxjs/toolkit';
import {Coffee} from '../../type/Coffee';

const coffeeList: Coffee[] = [];

export const coffeeSlice = createSlice({
  name: 'COFFEE_SLICE',
  initialState: {
    coffees: coffeeList,
    err: null,
  },
  reducers: {
    getCoffee: () => {
      console.log('GETTING COFFEE......');
    },
    getCoffeeSuccess: (state, action) => {
      console.log('Get Coffee Success !');
      state.coffees = [];
      state.coffees = action.payload;
    },
    getCoffeeFailure: (state, action) => {
      console.log('Get Coffee Failure');
      state.err = action.payload;
    },
  },
});
export const {getCoffee, getCoffeeSuccess, getCoffeeFailure} =
  coffeeSlice.actions;
export default coffeeSlice.reducer;
