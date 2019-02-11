import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import {AutoSizer, Grid, InfiniteLoader} from 'react-virtualized';
import CatalogArticleGridItem from './CatalogArticleGridItem';

export const CatalogArticleGrid = ({articles, routing}) => {
  const pepe = '';
  return (
    <Grid container spacing={16}>
      {articles.map((article, key) => (
        <CatalogArticleGridItem key={article.id} routing={routing} {...article} />
      ))}
    </Grid>);
};
CatalogArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
};

CatalogArticleGrid.defaultProps = {
  articles: [],
};

export default CatalogArticleGrid;
