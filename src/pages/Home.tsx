import React from 'react';
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPizzasById, selectPizzaData } from '../redux/slices/pizzaSlice';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'; // Сортировка через Redux-toolkit
import Categories from '../components/Categories';
import Sort, { arrSortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (numberPage: number) => {
    dispatch(setCurrentPage(numberPage));
  };

  const fetchPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    //* Сократил код при помощи asyng/await и отправил в Redux

    dispatch(
      // @ts-ignore решим позже дело (до редукса)
      fetchPizzasById({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
  };

  //! Если был первый рендер - проверяем URl-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = arrSortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //* mockapi некорректно присылает пиццы
  //! Если был первый рендер - запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  //! Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzasItemsSmallCode = items.map((objPizzas: any /**Позже */) => (
    <Link to={`/pizza/${objPizzas.id}`} key={objPizzas.id}>
      <PizzaBlock {...objPizzas} image={objPizzas.imageUrl} />
    </Link>
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="error-block">
          <h2 className="error-block__title">Произошла маленькая ошибочка</h2>
          <p className="error-block__text">Мы уже работаем над этим 🧰</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzasItemsSmallCode}
        </div>
      )}
      <Pagination currentPage={currentPage} onCurrentPage={onChangePage} />
    </>
  );
};

export default Home;
