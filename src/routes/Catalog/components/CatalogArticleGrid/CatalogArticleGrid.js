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
query getCatalog($cursor: String) {
  listArticles(first: 5 after: $cursor) {
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
}) => {
  const {
    data: {
      listArticles: articles,
    }, error, ...restProps
  } = useQuery(FETCH_CATALOG_DATA, {suspend});

  return (
    <Grid container spacing={16}>
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
