import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate';

type CategoriesPropsType = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const arrCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesPropsType> = React.memo(
  ({ value, onChangeCategory }) => {
    useWhyDidYouUpdate('Categories', { value, onChangeCategory });

    return (
      <div className="categories">
        <ul>
          {arrCategories.map((categoryName, index) => (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
