import React from 'react';
import ArticleItem from '@global/components/ArticleItem';
import {makeStyles, useQuery} from '@global/hooks';
import gql from 'graphql-tag';
import {flattenEdges} from '@global/utils/relay';
import styles from './ArticleCarousel.styles';

const FETCH_CATALOG_DATA = gql`
query getCatalog($cursor: String) {
  listArticles(last: 4 after: $cursor) {
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

const useStyles = makeStyles(styles);
// TODO Advance carousel: change every four items
export const ArticleCarousel = (props) => {
  const classes = useStyles(props);
  const {data} = useQuery(FETCH_CATALOG_DATA, {suspend: true});
  const articles = flattenEdges(data.listArticles);
  return (
    <div className={classes.root}>
      {articles.map(article => (
        <ArticleItem
          key={article.id}
          className={classes.item}
          {...article} />
      ))}

    </div>
  );
};

export default ArticleCarousel;
