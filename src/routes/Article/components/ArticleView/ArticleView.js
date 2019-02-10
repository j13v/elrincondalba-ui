// Core
import React, {useState, useEffect} from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import ArticleDetail from '../ArticleDetail';

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
}) => {
  if (!article) {
    return 'Este articulo no existe';
  }
  return (
    <ArticleDetail onCreate={createArticle} loading={loading} {...article} />

  );
};

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
