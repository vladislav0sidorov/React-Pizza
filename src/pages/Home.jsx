import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice'; // Сортировка через Redux-toolkit
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filterSlice);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzasItems, setPizzasItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //Скелетон
  const [currentPage, setCurrentPage] = React.useState(1); //Изменение страниц

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  //* mockapi некорректно присылает пиццы
  React.useEffect(() => {
    setIsLoading(true);
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
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
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzasItemsSmallCode = pizzasItems.map((objPizzas) => (
    <PizzaBlock key={objPizzas.id} {...objPizzas} image={objPizzas.imageUrl} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzasItemsSmallCode}</div>
      <Pagination onCurrentPage={(numberPage) => setCurrentPage(numberPage)} />
    </>
  );
};

export default Home;
