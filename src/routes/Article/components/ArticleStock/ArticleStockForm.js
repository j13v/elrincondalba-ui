// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Mui Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const ArticleStockForm = ({style}) => (
  <div style={{...style, textAlign: 'right'}}>
    <TextField
      type="number"
      variant="outlined"
      placeholder="0"
      inputProps={{max: 50, min: 0}}
      style={{
        textAlign: 'center',
      }}
     />
    <Button
      variant="outlined"
      color="primary"
      style={{
        marginLeft: '8px',
        padding: '1rem',
        height: '3.5rem',
      }}
    >
Añadir al stock
    </Button>
  </div>
);

export default ArticleStockForm;
