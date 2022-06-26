import React from 'react';

type CategoriesPropsType = {
  value: number;
  onChangeCategory: any /**Позже типизируем */;
};

const Categories: React.FC<CategoriesPropsType> = ({ value, onChangeCategory }) => {
  const arrCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

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
};

export default Categories;
