import React from 'react';


export const RepositoryList = ({ list = [] }) => (
  <ul>
    {list.map(({ node }) => (
      <li key={node.id}>
        <a href={node.url}>{node.name}</a>
      </li>
    ))}
  </ul>
);

export default RepositoryList;
