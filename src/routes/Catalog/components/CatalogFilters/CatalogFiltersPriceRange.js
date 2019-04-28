// Core
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// Hooks
import { useQuery } from '@global/hooks';
// HOC's
import { withSuspense } from '@global/components/Suspense';
// MuiComponents
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';

const FETCH_CATALOG_FILTER_PRICE_RANGE = gql`
query GetCatalogFilters(
  $categories: [String],
  $sizes: [String],
) {
  getArticlePriceRange(
    categories: $categories
    sizes:$sizes
  )
}
`;

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


const CatalogFiltersPriceRange = ({
  categories,
  sizes,
  suspend,
  ...restProps
}) => {
  const {
    data: {
      getArticlePriceRange: [
        priceRangeMin,
        priceRangeMax,
      ],
    },
  } = useQuery(FETCH_CATALOG_FILTER_PRICE_RANGE, {
    suspend,
    variables: {
      categories, sizes,
    },
  });

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
        <span>{priceRangeMin}</span>
        <span>{priceRangeMax}</span>
      </div>
      <Slider
        valueReducer={valueReducer}
        // step={10}
        min={priceRangeMin}
        max={priceRangeMax}
        {...restProps} />
      </>
  );

};

export default withSuspense(CatalogFiltersPriceRange);
