import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzasById = createAsyncThunk('pizza/fetchPizzasByStatus', async (params) => {
  const { order, sortBy, category, search, currentPage } = params;
  const response = await axios.get(
    `https://62a5b96a430ba53411cb6ce7.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
  );
  return response.data;
});

const initialState = {
  items: [],
  status: 'loading',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setPizzasItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasById.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzasById.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzasById.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const selectPizzaData = (state) => state.pizzaSlice;

export const { setPizzasItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
