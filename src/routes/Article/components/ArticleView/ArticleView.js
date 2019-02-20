// Core
import React, {useState, useEffect} from 'react';
import { graphql, compose } from 'react-apollo';
// Mui Components
import Grid from '@material-ui/core/Grid';
// Global Components
import Suspense from '@global/components/Suspense';
// Local Components
import ArticleDetail from '../ArticleDetail';
import ArticleGallery from '../ArticleGallery';


export const ArticleView = ({
  article,
  loading,
  sizes,
  createArticle,
  params: {articleId},
  ...restProps
}) => (
  <Grid container spacing={16}>
    <Grid item xs={6}>
      <Suspense>
        <ArticleGallery articleId={articleId} />
      </Suspense>
    </Grid>
    <Grid item xs={6}>
      <Suspense>
        <ArticleDetail articleId={articleId} />
      </Suspense>
    </Grid>
  </Grid>
);


export default ArticleView;

// const mapQueryToProps = ({
//   data: {
//     loading,
//     getArticle,
//     listSizes,
//     ...restData
//   }, ownProps,
//
// }) => ({
//   article: getArticle,
//   loading,
//   sizes: listSizes,
//   ...ownProps,
// });


// export default compose(
//   graphql(FETCH_ARTICLE_DATA, {
//     props: mapQueryToProps,
//     options: ownProps => ({variables: {id: ownProps.params.articleId}}),
//   }),
//   graphql(CREATE_ARTICLE, {
//     props: ({mutate, ownProps}) => ({
//       ...ownProps,
//       createArticle: (evt, data) => mutate({variables: data}),
//     }),
//   })
// )(ArticleView);

//
//
// const FETCH_ARTICLE_DATA = gql`
// query GetArticle($id: String!) {
//   listSizes
//   getArticle(id: $id) {
//     id
//     name
//     description
//     category
//     images
//     price
//     rating
//     stock {
//       count
//       refs
//       size
//     }
//     createdAt
//     updatedAt
//   }
// }
// `;
// const CREATE_ARTICLE = gql`
// mutation($images: [Upload]!, $description: String!, $name: String!, $price: Float!, $category: String!, $rating: Int!){
//   createArticle(
//     images: $images
//     description: $description
//     name: $name
//     price: $price
//     category: $category
//     rating: $rating
//   ) {
//     category
//     id
//   }
// }
// `;
