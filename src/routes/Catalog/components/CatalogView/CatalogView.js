// Core
import React, {useState, useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
// MuiComponents
import Grid from '@material-ui/core/Grid';
import ArticleGrid from '@global/components/ArticleGrid';


import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Slider, { defaultValueReducer } from '@material-ui/lab/Slider';

import {ROUTING_ARTICLE} from '@global/constants/routing';

console.info(ROUTING_ARTICLE);
const GET_ARTICLES = gql`
{
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

/**
 * a value reducer that will snap to multiple of 10 but also to the edge value
 * Useful here because the max=104 is not a multiple of 10
 */
function valueReducer(rawValue, props, event) {
  const {
    disabled,
    max,
    min,
    step,
  } = props;

  function roundToStep(number) {
    return Math.round(number / step) * step;
  }

  if (!disabled && step) {
    if (rawValue > min && rawValue < max) {
      if (rawValue === max - step) {
        // If moving the Slider using arrow keys and value is formerly an maximum edge value
        return roundToStep(rawValue + step / 2);
      }
      if (rawValue === min + step) {
        // Same for minimum edge value
        return roundToStep(rawValue - step / 2);
      }
      return roundToStep(rawValue);
    }
    return rawValue;
  }

  return defaultValueReducer(rawValue, props, event);
}

export const HomeView = ({
  subscribe, articles, loading, ...restProps
}) => {
  // useEffect(() => {
  //   const unsubscribe = subscribe('pepe');
  //   return () => {
  //     // Clean up the subscription
  //     unsubscribe();
  //   };
  // });

  const [state, setState] = useState({
    price: 0,
  });

  if (loading || !articles.length) {
    return <div>Loading ...</div>;
  }
  return (
    <Grid container spacing={16} style={{marginTop: '1em'}}>
      <Grid item xs={12} md={3}>
        <h3>Categorias</h3>
        <FormControl component="fieldset">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={false} onChange={() => ('gilad')} value="gilad" />}
              label="Gilad Gray"
            />
            <FormControlLabel
              control={<Checkbox checked={false} onChange={() => ('jason')} value="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={false} onChange={() => ('antoine')} value="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
        </FormControl>
        <h3>Precio</h3>
        <Slider
          value={state.price}
          valueReducer={valueReducer}
          min={0}
          max={104}
          step={10}
          onChange={(evt, value) => setState({price: value})} />
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
    loading, listArticles, subscribeToMore, ...restData
  }, ...rest
}) => {
  const articles = flattenConnectionEdges(listArticles, loading);
  console.info(articles);
  return ({
    articles,
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

export default graphql(GET_ARTICLES, {props: mapQueryToProps})(HomeView);
