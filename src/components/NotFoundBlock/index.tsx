import React from 'react';

import { Header } from '../../components';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <span>👻</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className="discription">К сожалению, даанная страница отсутвует на нашем сайте.</p>
    </div>
  );
};
