import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import RepositoryList from '../RepositoryList';
import DeleteArticle from '../DeleteArticle';

const GET_ARTICLES = gql`
{
  listArticles(last: 20) {
    edges {
      node {
        id
        name
        description
        images
      }
    }
  }
}
`;

export const ListArticles = ({articles, loading}) => {
  if (loading || !articles.length) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <DeleteArticle />
      <ul>
        {articles.map((article, key) => (
          <li key={key} style={{float: 'left', width: '33%'}}>
            <h3>{article.name}</h3>
            <img src="https://via.placeholder.com/300x120" alt="pene" />
            <div>{article.description}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

const flattenConnectionEdges = (data, loading) => (data && loading === false ? data.edges.map(edge => edge.node) : {edges: []});

const mapQueryToProps = ({data: {loading, listArticles}}) => ({articles: flattenConnectionEdges(listArticles, loading), loading: false});

export default graphql(GET_ARTICLES, {props: mapQueryToProps})(ListArticles);
