import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuerystringState } from '@global/hooks';
import { debounce } from '@global/utils/helpers';
import CatalogFiltersCategories from './CatalogFiltersCategories';
import CatalogFiltersSizes from './CatalogFiltersSizes';
import CatalogFiltersPriceRange from './CatalogFiltersPriceRange';


const MAP_STATE_KEYS = {
  categories: 'categorias',
  priceRange: 'rangoPrecio',
  sizes: 'tallas',
};

const parseArray = value => value.replace(/^\[/, '').replace(/\]$/, '').split(',').filter(Boolean);
const parseFloatArray = value => parseArray(value).map(parseFloat);
const stringifyArray = value => value.join(',');

const MAP_PARSE_STATE_KEYS = {
  categories: parseArray,
  sizes: parseArray,
  priceRange: parseFloatArray,
};

const MAP_STRINGIFY_STATE_KEYS = {
  categories: stringifyArray,
  sizes: stringifyArray,
  priceRange: stringifyArray,
};

const toggleValue = (data, value) => {
  const index = data.indexOf(value);
  data = [...data];
  if (index === -1) data.push(value);
  else data.splice(index, 1);
  return data;
};

const getValueFromObject = (map, key, value) => (map[key] ? map[key](value) : value);

const stringifyQsState = (value, key) => getValueFromObject(MAP_STRINGIFY_STATE_KEYS, key, value);
const parseQsState = (value, key) => getValueFromObject(MAP_PARSE_STATE_KEYS, key, value);
const useQsState = () => useQuerystringState({
  categories: [],
  sizes: [],
  priceRange: [],
}, {
  keys: MAP_STATE_KEYS,
  stringify: stringifyQsState,
  parse: parseQsState,
});

export const CatalogFilters = ({
  onChange,
  suspend,
}) => {
  const [state, setState] = useQsState();

  const handleChange = name => (evt) => {
    const newState = {
      ...state,
      [name]: toggleValue(state[name], evt.target.value),
    };
    onChange(evt, newState);
    setState(newState);
  };

  useEffect(() => {
    onChange(null, state);
  }, [true]);


  return (
    <div>
      <h3>Categorias</h3>
      <CatalogFiltersCategories onChange={handleChange('categories')} {...state} />
      <h3>Tallas</h3>
      <CatalogFiltersSizes onChange={handleChange('sizes')} {...state} />
      <h3>Precio</h3>
      <CatalogFiltersPriceRange
        onChange={(evt, value) => setState({
          ...state,
          priceRange: [0, value],
        })}
        value={state.priceRange[1]} />
    </div>
  );
};

CatalogFilters.propTypes = {
  suspend: PropTypes.bool,
  onChange: PropTypes.func,
};

CatalogFilters.defaultProps = {
  suspend: true,
  onChange: noop => noop,
};
export default CatalogFilters;
