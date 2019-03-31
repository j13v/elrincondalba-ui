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

const FETCH_CATALOG_FILTER_CATEGORIES = gql`
query GetCatalogFilters(
  $sizes: [String],
  $priceRange:[Float]
) {
  listArticleCategories(
    sizes: $sizes
    priceRange:$priceRange
  ){
    count
    name
  }
}
`;

const CatalogFiltersCategories = ({
  priceRange,
  sizes,
  categories,
  onChange,
  ...restProps
}) => {
  const {data: {listArticleCategories}} = useQuery(FETCH_CATALOG_FILTER_CATEGORIES, {
    variables: {priceRange, sizes},
    ...restProps,
  });
  return (
    <FormControl component="fieldset">
      <FormGroup row>
        {
        listArticleCategories.map(({name, count}, idx) => (
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
                checked={isChecked(categories, name)}
                onChange={onChange}
                disabled={count === 0}
                value={name} />)}
            label={name.toUpperCase()} />
        ))}
      </FormGroup>
    </FormControl>
  );

};

export default withSuspense(CatalogFiltersCategories, {
  fallback: (
    <FormControl component="fieldset">
      <FormGroup row>
        {
    (new Array(10)).fill(10).map((_, idx) => (
      <FormControlLabel
        style={{
          width: '50%',
          textOverflow: 'elipsis',
          margin: 0,
        }}
        key={idx}
        control={(
          <Checkbox
            color="primary" />)}
        label="none" />
    ))}
      </FormGroup>
    </FormControl>),
});
