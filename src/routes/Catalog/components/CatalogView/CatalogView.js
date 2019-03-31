// Core
import React, {useState} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import {withGraphQL, parseOptions, flattenEdges} from '@global/utils/relay';
// MuiComponents
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@global/hooks';
import {ROUTING_ARTICLE} from '@global/constants/routing';
import Suspense from '@global/components/Suspense';
import CatalogFilters from '../CatalogFilters';
import CatalogTabs from '../CatalogTabs';
import CatalogArticleGrid from '../CatalogArticleGrid';


export const CatalogView = (props) => {
  const [filters, setFilters] = useState({});

  const handleChange = (_, filters) => {
    setFilters(filters);
  };

  return (
    <Grid container spacing={8} style={{marginTop: '1em'}}>
      <Grid item xs={12} md={3}>
        <CatalogFilters onChange={handleChange} />
      </Grid>
      <Grid item sm={12} md={9}>
        <CatalogTabs style={{paddingBottom: '1rem'}} />
        <Suspense>
          <CatalogArticleGrid filters={filters} routing={ROUTING_ARTICLE} />
        </Suspense>
      </Grid>
    </Grid>
  );

};
export default CatalogView;


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


// , parseOptions(({
//   listArticles: articles,
//   listCategories: categories,
//   listSizes: sizes,
//   getArticlePriceRange: priceRange,
// }) => ({
//   articles,
//   categories,
//   priceRange,
//   sizes,
// }), ({
//   fetchMore,
//   subscribeToMore,
// }) => ({
//   loadMore: () => fetchMore(),
//   subscribe: () => subscribeToMore(SUBSCRIPTION_ARTICLES),
// }))
