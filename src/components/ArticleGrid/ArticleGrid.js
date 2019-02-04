import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import {AutoSizer, Grid, InfiniteLoader} from 'react-virtualized';
import ArticleGridItem from './ArticleGridItem';

export const ArticleGrid = ({articles}) => {
  const pepe = '';
  return (
    <Grid container spacing={16}>
      {articles.map((article, key) => (
        <ArticleGridItem key={article.id} {...article} />
      ))}
    </Grid>);
};
ArticleGrid.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
};

ArticleGrid.defaultProps = {
  articles: [],
};

export default ArticleGrid;
