// Core
import React, {useState, useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import LoadableImage from '@global/components/LoadableImage';

const stock = [{
  size: 'XS',
  count: 0,
}, {
  size: 'S',
  count: 0,
}, {
  size: 'M',
  count: 0,
}, {
  size: 'L',
  count: 0,
}, {
  size: 'XL',
  count: 0,
}];

export const ArticleView = () => {
  const pepe = '';
  return (
    <Grid container spacing={16}>
      <Grid item xs={1}>
        {(new Array(5)).fill(null).map((_, idx) => (<LoadableImage key={idx} style={{height: '100px', width: '100%'}} />))}
      </Grid>
      <Grid item xs={5}>
        <LoadableImage style={{height: '600px', width: '100%'}} />
      </Grid>
      <Grid item xs={6}>
        <h2>
        Gabardina de cuadros
        </h2>
        <small>Ref 5507/513/505</small>
        <small>Talla modelo S</small>
        <p>19,99 €</p>
        <p>Selecciona tu talla</p>
        <div>
          {stock.map(({size}, idx) => (
            <span style={{
              border: 'solid 1px #e5e5e5',
              padding: '0.5rem',
              fontWeight: 100,
              minWidth: '2em',
              display: 'inline-block',
              textAlign: 'center',
              cursor: 'pointer',
            }}>
              {size}
            </span>
          ))}
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>

      </Grid>
    </Grid>
  );
};


export default ArticleView;
