// Core
import React, {useState, useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
// MuiComponents
import Grid from '@material-ui/core/Grid';
import ArticleGrid from '@global/components/ArticleGrid';


import {ROUTING_ARTICLE} from '@global/constants/routing';
import CatalogFilters from '../CatalogFilters';

console.info(ROUTING_ARTICLE);

const FETCH_CATALOG_DATA = gql`
{
  listCategories
  getArticleRangePrice{
    max
    min
  }
  listArticles(last: 20) {
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
  categories,
  priceRange,
  ...restProps
}) => {
  // useEffect(() => {
  //   const unsubscribe = subscribe('pepe');
  //   return () => {
  //     // Clean up the subscription
  //     unsubscribe();
  //   };
  // });


  if (loading || !articles.length) {
    return <div>Loading ...</div>;
  }
  return (
    <Grid container spacing={16} style={{marginTop: '1em'}}>
      <Grid item xs={12} md={3}>
        <CatalogFilters categories={categories} priceRange={priceRange} />
      </Grid>
      <Grid item sm={12} md={9}>
        <ArticleGrid articles={articles} routing={ROUTING_ARTICLE} />
      </Grid>
    </Grid>
  );
};

const flattenConnectionEdges = (data, loading) => (data && loading === false ? data.edges.map(edge => edge.node) : {edges: []});

const mapQueryToProps = ({
  data: {
    loading,
    listArticles,
    subscribeToMore,
    listCategories,
    getArticleRangePrice,
    ...restData
  }, ...rest
}) => {
  const articles = flattenConnectionEdges(listArticles, loading);
  const categories = listCategories;
  const priceRange = getArticleRangePrice;
  return ({
    articles,
    categories,
    priceRange,
    loading: false,
    subscribe: id => subscribeToMore({
      document: SUBSCRIPTION_ARTICLES,
      // variables: { $id: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.postLikesSubscribe;
        console.info('update', articles, prev, newFeedItem);

        return {
          ...prev,
          listArticles: {
            ...prev.listArticles,
            edges: [...newFeedItem.map(node => ({
              __typename: 'ArticleEdge',
              node: {
                __typename: 'Article',
                ...node,
              },
            })),
              // ...prev.listArticles.edges
            ],
          },
        };
      },
    }),

  });
};

export default graphql(FETCH_CATALOG_DATA, {props: mapQueryToProps})(HomeView);
