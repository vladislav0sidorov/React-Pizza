import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { decrement, increment } from './redux/slices/filterSlice';

import { useSelector, useDispatch } from 'react-redux';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import Header from './components/Header';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  console.log(searchValue);

  return (
    <div className="wrapper">
      <button aria-label="Increment value" onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
        Decrement
      </button>
      <span>{count}</span>

      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
