export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}
