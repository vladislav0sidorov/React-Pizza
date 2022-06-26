import React from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import styles from './Searh.module.scss';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClean = () => {
    dispatch(setSearchValue(''));
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  // две послдение функции о debounce (реализовано при помощи 2х useState)
  const updateChangeValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 400),
    [],
  );

  const onChangeInput = (changeText: any /**Позже исправим */) => {
    setValue(changeText.target.value);
    updateChangeValue(changeText.target.value);
  };

  return (
    <div className="search">
      <div className={styles.search__body}>
        <svg
          className={styles.search__icon}
          enableBackground="new 0 0 50 50"
          height="50px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 50 50"
          width="50px"
          xmlns="http://www.w3.org/2000/svg">
          <rect fill="none" height="50" width="50" />
          <circle
            cx="21"
            cy="20"
            fill="none"
            r="16"
            stroke="#000000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <line
            fill="none"
            stroke="#000000"
            strokeMiterlimit="10"
            strokeWidth="4"
            x1="32.229"
            x2="45.5"
            y1="32.229"
            y2="45.5"
          />
        </svg>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          className={styles.search__imput}
          placeholder="Поиск пиццы..."
        />
        {value && (
          <svg
            onClick={onClickClean}
            className={styles.search__remove}
            data-name="Layer 1"
            height="200"
            id="Layer_1"
            viewBox="0 0 200 200"
            width="200"
            xmlns="http://www.w3.org/2000/svg">
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Search;
