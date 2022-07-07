import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem, SearchPizzaParams } from './types';

export const fetchPizzasById = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasByStatus',
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://62a5b96a430ba53411cb6ce7.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);
