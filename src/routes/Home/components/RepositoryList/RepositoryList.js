import React from 'react';
import PropTypes from 'prop-types';


export const RepositoryList = ({ list = [] }) => (
  <ul>
    {list.map(({node}) => (
      <li key={node.id}>
        <a href={node.url}>{node.name}</a>
      </li>
    ))}
  </ul>
);


RepositoryList.propType = {
  list: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.object,
  })),
};

export default RepositoryList;
