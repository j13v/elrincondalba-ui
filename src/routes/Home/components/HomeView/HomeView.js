import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import red from '@material-ui/core/colors/red';
import ArticleGrid from '../ArticleGrid';

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

export const HomeView = ({articles, loading}) => {
  if (loading || !articles.length) {
    return <div>Loading ...</div>;
  }
  return (
    <ArticleGrid articles={articles} />
  );
};

const flattenConnectionEdges = (data, loading) => (data && loading === false ? data.edges.map(edge => edge.node) : {edges: []});

const mapQueryToProps = ({data: {loading, listArticles}}) => ({articles: flattenConnectionEdges(listArticles, loading), loading: false});

export default graphql(GET_ARTICLES, {props: mapQueryToProps})(HomeView);
