import React from 'react';


export default ({value = 0, currency = '€', ...restProps}) => {
  const valueChunks = (`${value}`).split(/[.,]/);
  const firstChunk = valueChunks[0];
  const lastChunk = valueChunks[1];
  return (
    <span {...restProps}>
      <span style={{fontSize: '1em'}}>{firstChunk}</span>
      <span style={{fontSize: '0.6em'}}>{`.${(lastChunk || '').padEnd(2, '0')}${currency}`}</span>
    </span>
  );
};
