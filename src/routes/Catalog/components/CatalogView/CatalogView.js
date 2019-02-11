// Core
import React, {useState, useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import {withGraphQL} from '@global/utils/relay';
// MuiComponents
import Grid from '@material-ui/core/Grid';

import {ROUTING_ARTICLE} from '@global/constants/routing';
import CatalogFilters from '../CatalogFilters';
import CatalogTabs from '../CatalogTabs';
import CatalogArticleGrid from '../CatalogArticleGrid';

const FETCH_CATALOG_DATA = gql`
query getCatalog($cursor: String) {
  getArticlePriceRange
  listCategories
  listSizes
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


const SUBSCRIPTION_ARTICLES = gql`
subscription {
  postLikesSubscribe {
    id
    name
    description
    images
    price
    category
    rating
  }
}
`;


export const HomeView = ({
  subscribe,
  articles,
  loading,
  loadMore,
  categories,
  priceRange,
  sizes,
  ...restProps
}) => {

  const runOnce = true;
  useEffect(() => {
    const unsubscribe = subscribe('pepe');
    return () => {
      // Clean up the subscription
      unsubscribe();
    };
  }, [runOnce]);
  useEffect(() => {
    const int = setTimeout(loadMore, 60000);
    return () => {
      clearTimeout(int);
    };
  });

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <Grid container spacing={16} style={{marginTop: '1em'}}>
      <Grid item xs={12} md={3}>
        <CatalogFilters categories={categories} priceRange={priceRange} sizes={sizes} />
      </Grid>
      <Grid item sm={12} md={9}>
        <CatalogTabs style={{paddingBottom: '1rem'}} />
        <CatalogArticleGrid articles={articles} routing={ROUTING_ARTICLE} />
      </Grid>
    </Grid>
  );
};

export default withGraphQL(FETCH_CATALOG_DATA, ({
  listArticles: articles,
  listCategories: categories,
  listSizes: sizes,
  getArticlePriceRange: priceRange,
}) => ({
  articles,
  categories,
  priceRange,
  sizes,
}), ({
  fetchMore,
  subscribeToMore,
}) => ({
  loadMore: () => fetchMore(),
  subscribe: () => subscribeToMore(SUBSCRIPTION_ARTICLES),
}))(HomeView);


// const flattenConnectionEdges = (data, loading) => (data && loading === false ? data.edges.map(edge => edge.node) : {edges: []});

//
// const mapQueryToProps = ({
//   data: {
//     loading,
//
//     subscribeToMore,
//     fetchMore,
//
//     variables,
//
//     ...restData
//   }, ...rest
// }) => {
//   const {
// listArticles: articles,
// listCategories: categories,
// getArticleRangePrice: priceRange,
//   } = flattenEdges(restData);
//
//   return ({
//     articles,
//     categories,
//     priceRange,
//     loading,
//     loadMore: () => {
//       if (!restData.listArticles) return;
//       const {
//         pageInfo: {
//           endCursor,
//           hasNextPage,
//         },
//       } = restData.listArticles;
//
//       if (hasNextPage) {
//         fetchMore({
//           updateQuery: (prev, {fetchMoreResult}) => updateQuery(prev, fetchMoreResult),
//           variables: {
//             ...variables,
//             cursor: endCursor,
//           },
//         });
//       }
//     },
//     subscribe: id => console.log('subscribe') || subscribeToMore({
//       document: SUBSCRIPTION_ARTICLES,
//       // variables: { $id: id },
//       updateQuery: (prev, { subscriptionData }) => {
//         if (!subscriptionData.data) return prev;
//         const {data: {postLikesSubscribe}} = subscriptionData;
//         console.info('update', postLikesSubscribe.name, postLikesSubscribe.rating);
//
//         return {
//           ...prev,
//           listArticles: {
//             ...prev.listArticles,
//             edges: prev.listArticles
//               .edges
//               .map(({node, __typename}) => ({
//                 node: console.log('match', postLikesSubscribe.name, node.name) || (postLikesSubscribe.name === node.name ? postLikesSubscribe : node),
//                 __typename,
//               })),
//           },
//         };
//       },
//     }),
//
//   });
// };
