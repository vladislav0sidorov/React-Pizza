import { getCartFromLS } from '../../utils/GetCartFromLS';
import { calcTotalPrice } from '../../utils/CalcTotalPrice';

import { CartItem, CartSliceState } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemPizza(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItemPizza(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeItemPizza(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItemPizza(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItemPizza, removeItemPizza, clearItemPizza, minusItemPizza } = cartSlice.actions;
export default cartSlice.reducer;
