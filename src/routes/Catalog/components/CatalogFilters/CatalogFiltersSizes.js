// Core
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// Hooks
import { useQuery, useQuerystringState } from '@global/hooks';
import { isChecked } from '@global/utils/helpers';
// HOC's
import { withSuspense } from '@global/components/Suspense';
// MuiComponents
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const FETCH_CATALOG_FILTER_SIZES = gql`
query GetCatalogFilters(
  $categories: [String],
  $priceRange:[Float]
) {
  listArticleSizes(
    categories: $categories
    priceRange:$priceRange
  ) {
    count
    name
  }
}
`;

const CatalogFiltersSizes = ({
  priceRange,
  sizes,
  categories,
  onChange,
  ...restProps
}) => {
  const {data: {listArticleSizes}} = useQuery(FETCH_CATALOG_FILTER_SIZES, {
    variables: {
      priceRange,
      categories,
    },
    ...restProps,
  });
  return (
    <FormControl component="fieldset">
      <FormGroup row>
        {
        listArticleSizes.map(({name, count}, idx) => (
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
                checked={isChecked(sizes, name)}
                onChange={onChange}
                disabled={count === 0}
                value={name} />)}
            label={name.toUpperCase()} />
        ))}
      </FormGroup>
    </FormControl>
  );

};

export default withSuspense(CatalogFiltersSizes);
