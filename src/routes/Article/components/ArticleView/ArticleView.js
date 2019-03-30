// Core
import React, {useState, useEffect} from 'react';
import { graphql, compose } from 'react-apollo';
// Components
import {Route, Switch} from 'react-router';
// Mui Components
import Grid from '@material-ui/core/Grid';
// Global Components
import Suspense from '@global/components/Suspense';
import SwitchAnimated from '@global/components/SwitchAnimated';
import ArticleCarousel from '@global/components/ArticleCarousel';
// Constants
import {
  ROUTING_ARTICLE_ORDER,
  ROUTING_ARTICLE_CREATE,
  ROUTING_ARTICLE_EDIT,
  ROUTING_ARTICLE_STOCK,
} from '@global/constants/routing';
// Local Components
import ArticleGallery from '../ArticleGallery';
import ArticleInfo from '../ArticleInfo';
import ArticleOrderForm from '../ArticleOrderForm';
import ArticleStock from '../ArticleStock';

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
        <Switch>
          <Route path={ROUTING_ARTICLE_EDIT}>
            <ArticleGallery edit articleId={articleId} />
          </Route>
          <Route>
            <ArticleGallery articleId={articleId} />
          </Route>
        </Switch>
      </Suspense>
    </Grid>
    <Grid item xs={6}>
      <Suspense>
        <SwitchAnimated>
          <Route
            path={ROUTING_ARTICLE_ORDER}
            component={({
              match: {
                params: {
                  stockId,
                },
              },
            }) => <ArticleOrderForm stock={stockId} />} />
          <Route path={ROUTING_ARTICLE_STOCK}>
            <ArticleStock articleId={articleId} />
          </Route>
          <Route path={ROUTING_ARTICLE_CREATE}>
            <ArticleInfo />
          </Route>
          <Route path={ROUTING_ARTICLE_EDIT}>
            <ArticleInfo articleId={articleId} edit />
          </Route>
          <Route>
            <ArticleInfo articleId={articleId} />
          </Route>
        </SwitchAnimated>
      </Suspense>
    </Grid>
    <Grid item xs={12}>
      <h2>Artículos similares</h2>
      <ArticleCarousel />
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
