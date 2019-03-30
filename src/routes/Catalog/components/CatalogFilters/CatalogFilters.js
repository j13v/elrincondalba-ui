import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useQuerystringState } from '@global/hooks';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';
import {withErrorBoundary} from '@global/components/ErrorBoundary';
import { getDefaultValues } from 'apollo-utilities';


/**
 * a value reducer that will snap to multiple of 10 but also to the edge value
 * Useful here because the max=104 is not a multiple of 10
 */
function valueReducer(rawValue, props, event) {
  const {
    disabled,
    max,
    min,
    step,
  } = props;

  function roundToStep(number) {
    return Math.round(number / step) * step;
  }

  if (!disabled && step) {
    if (rawValue > min && rawValue < max) {
      if (rawValue === max - step) {
        // If moving the Slider using arrow keys and value is formerly an maximum edge value
        return roundToStep(rawValue + step / 2);
      }
      if (rawValue === min + step) {
        // Same for minimum edge value
        return roundToStep(rawValue - step / 2);
      }
      return roundToStep(rawValue);
    }
    return rawValue;
  }

  return defaultValueReducer(rawValue, props, event);
}

const FETCH_CATALOG_DATA = gql`
query {
  getArticlePriceRange
  listCategories
  listSizes
}
`;

const toggleCategory = (data, value) => {
  const index = data.indexOf(value);
  data = [...data];
  if (index === -1) data.push(value);
  else data.splice(index, 1);
  return data;
};

const MAP_STATE_KEYS = {
  categories: 'categorias',
  priceRange: 'rangoPrecio',
  sizes: 'tallas',
};

const parseArray = value => value.split(',').filter(Boolean);
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

const getValueFromObject = (map, key, value) => (map[key] ? map[key](value) : value);

const isChecked = (data = [], value) => data.findIndex(selected => selected.toLowerCase() === value.toLowerCase()) !== -1;

export const CatalogFilters = ({
  onChange,
  suspend,
}) => {
  const [state, setState] = useQuerystringState({
    categories: [],
    sizes: [],
    priceRange: [],
  }, {
    keys: MAP_STATE_KEYS,
    stringify: (value, key) => getValueFromObject(MAP_STRINGIFY_STATE_KEYS, key, value),
    parse: (value, key) => getValueFromObject(MAP_PARSE_STATE_KEYS, key, value),
  });

  const {
    data: {
      getArticlePriceRange: [priceRangeMin, priceRangeMax],
      listCategories: categories,
      listSizes: sizes,
    }, error,
  } = useQuery(FETCH_CATALOG_DATA, {suspend});

  const handleChange = name => (evt) => {
    const newState = {
      ...state,
      [name]: toggleCategory(state[name], evt.target.value),
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
      <FormControl component="fieldset">
        <FormGroup row>
          {
        categories.map(({name}, idx) => (
          <FormControlLabel
            style={{
              width: '50%',
              textOverflow: 'elipsis',
              margin: 0,
            }}
            key={idx}
            control={(
              <Checkbox
                color="primary"
                checked={isChecked(state.categories, category)}
                onChange={handleChange('categories')}
                value={name} />)}
            label={name} />
        ))}
        </FormGroup>
      </FormControl>
      <h3>Tallas</h3>
      <FormControl component="fieldset">
        <FormGroup row>
          {
        sizes.map((size, idx) => (
          <FormControlLabel
            style={{
              width: '50%',
              textOverflow: 'elipsis',
              margin: 0,
            }}
            key={idx}
            control={(
              <Checkbox
                color="primary"
                checked={isChecked(state.sizes, size)}
                onChange={handleChange('sizes')}
                value={size.toLowerCase()} />)}
            label={size} />
        ))}
        </FormGroup>
      </FormControl>
      <h3>Precio</h3>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <span>{priceRangeMin}</span>
        <span>{priceRangeMax}</span>
      </div>
      <Slider
        value={state.priceRange[0]}
        valueReducer={valueReducer}
        min={priceRangeMin}
        max={priceRangeMax}
        step={10}
        onChange={(evt, value) => setState({
          ...state,
          priceRange: [value],
        })} />

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
export default withErrorBoundary(CatalogFilters);
