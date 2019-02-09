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
mutation($images: [Upload]!){
  createArticle(
    images: $images
    description: "test"
    name: "pepe"
    price: 39.99
    category: "VESTIDOS"
    rating: 8
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
  const pepe = '';
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
