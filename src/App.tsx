import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'));
const PizzaCard = React.lazy(() => import(/*webpackChunkName: "PizzaCard"*/ './pages/PizzaCard'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div className="container">Идет загрузка</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div className="container">Идет загрузка</div>}>
              <PizzaCard />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<div className="container">Идет загрузка</div>}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
