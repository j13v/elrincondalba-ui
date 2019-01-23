import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RepositoryList from '../RepositoryList';

const GET_ARTICLES = gql`
{
  list {
    name
    description
    images
  }
}
`;

export default () => (
  <Query query={GET_ARTICLES}>
    {({ data: {list}, loading }) => {
      if (loading || !list) {
        return <div>Loading ...</div>;
      }
      return (
        <ul>
          {list.map((item, key) => (
            <li key={key} style={{float: 'left', width: '33%'}}>
              <h3>{item.name}</h3>
              <img src="https://via.placeholder.com/300x120" />
              <div>{item.description}</div>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);
