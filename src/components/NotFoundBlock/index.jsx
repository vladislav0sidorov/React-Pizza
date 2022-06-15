import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>👻</span>
      <br />
      <h1>Ничего не найдено</h1>
      <p className="discription">
        К сожалению, даанная страница отсутвует на нашем сайте.
      </p>
    </div>
  );
};

export default NotFoundBlock;
