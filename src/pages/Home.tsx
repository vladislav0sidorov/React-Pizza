import React from 'react';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination, arrSortList } from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzasById } from '../redux/pizza/asyncActions';
import { PizzaItem, SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMountedJsonCart = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

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
      fetchPizzasById({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  //! Если был первый рендер - проверяем URl-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = arrSortList.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          ...params,
          sort: sort || arrSortList[0],
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
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
    if (isMountedJsonCart.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMountedJsonCart.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzasItemsSmallCode = items.map((objPizzas) => (
    <PizzaBlock {...objPizzas} key={objPizzas.id} image={objPizzas.imageUrl} />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort value={sort} />
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
      </div>
    </>
  );
};

export default Home;
