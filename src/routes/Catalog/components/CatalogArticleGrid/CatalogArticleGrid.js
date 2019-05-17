import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {flattenEdges} from '@global/utils/relay';
// import {AutoSizer, Grid, InfiniteLoader} from 'react-virtualized';
import gql from 'graphql-tag';
import { useQuery } from '@global/hooks';
import {withErrorBoundary} from '@global/components/ErrorBoundary';
import CatalogArticleGridItem from './CatalogArticleGridItem';

const FETCH_CATALOG_DATA = gql`
query getCatalog(
  $categories: [String],
  $priceRange: [Float],
  $sizes: [String],
  $sorting: ArticleSortingEnum,
) {
  listArticles(
    categories: $categories
    priceRange: $priceRange
    sizes: $sizes,
    sorting: $sorting,
  ) {
    edges {
      node {
        id
        name
        description
        images
        price
        category
        rating
      }
    }
    totalCount
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
`;

export const CatalogArticleGrid = ({
  suspend,
  routing,
  filters,
  sorting,
}) => {
  const {
    data: {
      listArticles: articles,
    }, error, ...restProps
  } = useQuery(FETCH_CATALOG_DATA, {
    variables: {
      ...filters,
      sorting,
    },
    suspend,
  });

  return (
    <Grid container spacing={2}>
      {flattenEdges(articles).map((article, key) => (
        <CatalogArticleGridItem key={article.id} routing={routing} {...article} />
      ))}
    </Grid>);
};
CatalogArticleGrid.propTypes = {
  suspend: PropTypes.bool,
};

CatalogArticleGrid.defaultProps = {
  suspend: true,
};

export default withErrorBoundary(CatalogArticleGrid);
