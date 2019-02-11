// Core
import React, {useState, useEffect} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
// Mui Components
import Grid from '@material-ui/core/Grid';
// Router Components
import {Route, Switch} from 'react-router';
// Constants
import {ROUTING_ARTICLE_ORDER} from '@global/constants/routing';
// Local Components
import ArticleDetail from '../ArticleDetail';
import ArticleInfo from '../ArticleInfo';
import ArticleOrderForm from '../ArticleOrderForm';
import ArticleMainImage from '../ArticleMainImage';


const FETCH_ARTICLE_DATA = gql`
query GetArticle($id: String!) {
  listSizes
  getArticle(id: $id) {
    id
    name
    description
    category
    images
    price
    rating
    stock {
      count
      refs
      size
    }
    createdAt
    updatedAt
  }
}
`;
const CREATE_ARTICLE = gql`
mutation($images: [Upload]!, $description: String!, $name: String!, $price: Float!, $category: String!, $rating: Int!){
  createArticle(
    images: $images
    description: $description
    name: $name
    price: $price
    category: $category
    rating: $rating
  ) {
    category
    id
  }
}
`;

export const ArticleView = ({
  article,
  loading,
  sizes,
  createArticle,
  ...restProps
}) => (
  <Grid container spacing={16}>
    <Grid item xs={1} />
    <Grid item xs={5}>
      <ArticleMainImage />
    </Grid>
    <Grid item xs={6}>
      <Switch>
        <Route path={ROUTING_ARTICLE_ORDER}>
          <ArticleOrderForm onRequest={console.log} stock="asdadsasd" />
        </Route>
        <Route>
          <ArticleInfo
            loading={loading}
            article={article}
            onCreate={(evt, data) => onCreate(evt, {...data, images: state.files})}
            onEdit={console.log}
            onUpdate={console.log}
            onRequest={console.log} />
        </Route>
      </Switch>

    </Grid>
  </Grid>
);

const mapQueryToProps = ({
  data: {
    loading,
    getArticle,
    listSizes,
    ...restData
  }, ownProps,

}) => ({
  article: getArticle,
  loading,
  sizes: listSizes,
  ...ownProps,
});


export default compose(
  graphql(FETCH_ARTICLE_DATA, {
    props: mapQueryToProps,
    options: ownProps => ({variables: {id: ownProps.params.articleId}}),
  }),
  graphql(CREATE_ARTICLE, {
    props: ({mutate, ownProps}) => ({
      ...ownProps,
      createArticle: (evt, data) => mutate({variables: data}),
    }),
  })
)(ArticleView);
