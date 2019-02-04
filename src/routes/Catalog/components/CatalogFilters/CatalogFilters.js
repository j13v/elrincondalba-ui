import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';

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

export const CatalogFilters = ({categories, priceRange}) => {
  const [state, setState] = useState({
    price: 0,
  });
  return (
    <div>
      <h3>Categorias</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {
        categories.map((category, idx) => (
          <FormControlLabel
            key={idx}
            control={<Checkbox checked={false} onChange={() => ('gilad')} value="gilad" />}
            label={category}
        />
        ))
      }
        </FormGroup>
      </FormControl>
      <h3>Precio</h3>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <span>{priceRange.min}</span>
        <span>{priceRange.max}</span>
      </div>
      <Slider
        value={state.price}
        valueReducer={valueReducer}
        min={priceRange.min}
        max={priceRange.max}
        step={10}
        onChange={(evt, value) => setState({price: value})} />

    </div>
  );
};

export default CatalogFilters;
