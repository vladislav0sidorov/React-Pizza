export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  TITLE = 'title',
}
export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortItem;
}
