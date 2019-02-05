import { graphql } from 'react-apollo';

export const mapEdges = (data, iterator = a => (a), dst = {}) => {
  for (let keys = Object.keys(data), i = 0; i < keys.length; i++) {
    const key = keys[i];
    let value = data[key];
    if (value && Array.isArray(value.edges)) {
      value = iterator(value, key);
    }
    dst[key] = value;
  }
  return dst;
};

export const flattenEdges = (data, dst = {}) => mapEdges(data, value => value.edges.map(({node}) => node));

export const mergeEdges = (prev, next, reload) => {

  const {
    edges: newEdges,
    pageInfo,
  } = next;

  let edges = [];

  if (prev) {
    edges = [...prev.edges, ...newEdges];
  }

  return {
    ...next,
    edges,
    pageInfo,
  };
};

export const mergeResults = (prev, next) => {
  const result = {};

  if (!prev) {
    return next;
  }

  if (prev && next && Array.isArray(prev.edges) && Array.isArray(next.edges)) {
    return mergeEdges(prev, next);
  }

  return next;
};

export const updateQuery = (prev, next) => ({
  ...next,
  ...mapEdges(next, (value, key) => mergeEdges(prev[key], next[key])),
});

export const mapQueryToProps = mapper => (data) => {
  mapper({...data});
};

export const mapDispatchToProps = () => {

};


export const queryReducer = (type, state) => {
  switch (type) {
    case 'SUB':
      return state;
    case 'MORE':
      return state;
    default:
      return state;
  }
};

export const withGraphQL = (
  query,
  mapQueryToProps = noop => noop,
  mapDispatchToProps = noop => noop,
  opts = {}
) => (Cmp) => {
  if (!query) {
    throw new Error('Missing graphql query');
  }
  opts = {
    props: ({
      data: {
        // Props
        error,
        loading,
        variables,
        networkStatus,
        // Dispatchers
        subscribeToMore,
        fetchMore,
        startPolling,
        stopPolling,
        updateQuery: oldUpdateQuery,
        refetch,
        ...restData
      },
    }) => {
      const props = flattenEdges(restData);
      console.log('props', query, props, restData);
      return ({
        error,
        loading,
        variables,
        networkStatus,
        ...mapQueryToProps(props),
        ...mapDispatchToProps({
          refetch,
          startPolling,
          stopPolling,
          updateQuery: oldUpdateQuery,
          subscribeToMore: (query, opts = {}) => {
            opts.matchEdgeField = opts.matchEdgeField || 'name';
            return subscribeToMore({
              ...opts,
              document: query,
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const {
                  error,
                  loading,
                  data: {
                    postLikesSubscribe,
                  },
                } = subscriptionData;
                // console.info('update', subscriptionData);

                return {
                  ...prev,
                  listArticles: {
                    ...prev.listArticles,
                    edges: prev.listArticles
                      .edges
                      .map(({node, __typename}) => ({
                        node: (postLikesSubscribe[opts.matchEdgeField] === node[opts.matchEdgeField] ? postLikesSubscribe : node),
                        __typename,
                      })),
                  },
                };
              },
            });
          },
          fetchMore: () => {
            console.log(restData);
            if (!restData.listArticles) return;
            const {
              pageInfo: {
                endCursor,
                hasNextPage,
              },
            } = restData.listArticles;

            if (hasNextPage) {
              fetchMore({
                updateQuery: (prev, {fetchMoreResult}) => updateQuery(prev, fetchMoreResult),
                variables: {
                  ...variables,
                  cursor: endCursor,
                },
              });
            }
          },
        }),
      });
    },
    ...opts,
  };
  return graphql(query, {
    ...opts,
    props: (...args) => opts.props(...args) || console.log(opts.props(...args)),
  })(Cmp);
};


//
// loadMore: () => {
//   if (!restData.listArticles) return;
//   const {
//     pageInfo: {
//       endCursor,
//       hasNextPage,
//     },
//   } = restData.listArticles;
//
//   if (hasNextPage) {
//     fetchMore({
//       updateQuery: (prev, {fetchMoreResult}) => updateQuery(prev, fetchMoreResult),
//       variables: {
//         ...variables,
//         cursor: endCursor,
//       },
//     });
//   }
// },
// subscribe: id => console.log('subscribe') || subscribeToMore({
//   document: SUBSCRIPTION_ARTICLES,
//   // variables: { $id: id },
//   updateQuery: (prev, { subscriptionData }) => {
//     if (!subscriptionData.data) return prev;
//     const {data: {postLikesSubscribe}} = subscriptionData;
//     console.info('update', postLikesSubscribe.name, postLikesSubscribe.rating);
//
//     return {
//       ...prev,
//       listArticles: {
//         ...prev.listArticles,
//         edges: prev.listArticles
//           .edges
//           .map(({node, __typename}) => ({
//             node: console.log('match', postLikesSubscribe.name, node.name) || (postLikesSubscribe.name === node.name ? postLikesSubscribe : node),
//             __typename,
//           })),
//       },
//     };
//   },
// }),
