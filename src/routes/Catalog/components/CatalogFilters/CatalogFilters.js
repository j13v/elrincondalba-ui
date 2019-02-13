import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery } from '@global/hooks';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';
import {withErrorBoundary} from '@global/components/ErrorBoundary';

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

export const CatalogFilters = ({
  suspend,
}) => {
  const [state, setState] = useState({
    categories: [],
    sizes: [],
    price: 0,
  });

  const {
    data: {
      getArticlePriceRange: [priceRangeMin, priceRangeMax],
      listCategories: categories,
      listSizes: sizes,
    }, error,
  } = useQuery(FETCH_CATALOG_DATA, {suspend});

  return (
    <div>
      <h3>Categorias</h3>
      <FormControl component="fieldset">
        <FormGroup row>
          {
        categories.map((category, idx) => (
          <FormControlLabel
            style={{
              width: '50%',
              textOverflow: 'elipsis',
              margin: 0,
            }}
            key={idx}
            control={(
              <Checkbox
                checked={state.categories.includes(category)}
                onChange={() => setState({
                  ...state,
                  categories: toggleCategory(state.categories, category),
                })}
                value="gilad" />)}
            label={category} />
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
                checked={state.categories.includes(size)}
                onChange={() => setState({
                  ...state,
                  categories: toggleCategory(state.categories, size),
                })}
                value="gilad" />)}
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
        value={state.price}
        valueReducer={valueReducer}
        min={priceRangeMin}
        max={priceRangeMax}
        step={10}
        onChange={(evt, value) => setState({
          ...state,
          price: value,
        })} />

    </div>
  );
};

CatalogFilters.propTypes = {
  suspend: PropTypes.bool,
};

CatalogFilters.defaultProps = {
  suspend: true,
};
export default withErrorBoundary(CatalogFilters);
