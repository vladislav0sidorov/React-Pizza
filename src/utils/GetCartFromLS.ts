import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './CalcTotalPrice';

export const getCartFromLS = () => {
  const dataCartFromLS = localStorage.getItem('cart');
  const items = dataCartFromLS ? JSON.parse(dataCartFromLS) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
