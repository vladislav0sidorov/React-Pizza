import { createSlice } from '@reduxjs/toolkit';
import { fetchPizzasById } from './asyncActions';
import { PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzasItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzasById.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzasById.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzasById.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },

  // extraReducers: {
  //   [fetchPizzasById.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzasById.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzasById.rejected]: (state) => {
  //     state.items = [];
  //     state.status = 'error';
  //   },
  // },
});

export const { setPizzasItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
