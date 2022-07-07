import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PizzaCard: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62a5b96a430ba53411cb6ce7.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Произошла ошибка');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <div className="pizza-cart__body">
        <h1>{pizza.title}</h1>
        <div className="pizza-body__image">
          <img src={pizza.imageUrl} alt="pizza-image" />
        </div>
        <p> {pizza.price} ₽</p>
      </div>
    </div>
  );
};

export default PizzaCard;
