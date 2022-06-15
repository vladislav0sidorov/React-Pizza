import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const { searchValue } = React.useContext(SearchContext);
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //Скелетон
  const [categoryId, setCategoryId] = React.useState(0); //Глобальная сортировка по категориям
  const [currentPage, setCurrentPage] = React.useState(1); //Изменение страниц
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' }); //Глобальная сортировка по типу

  //* mockapi некорректно присылает пиццы
  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://62a5b96a430ba53411cb6ce7.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((PizzasData) => {
        setPizzasItems(PizzasData);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzasItemsSmallCode = pizzasItems.map((objPizzas) => (
    <PizzaBlock key={objPizzas.id} {...objPizzas} image={objPizzas.imageUrl} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasItemsSmallCode}</div>
      <Pagination onCurrentPage={(numberPage) => setCurrentPage(numberPage)} />
    </>
  );
};

export default Home;
