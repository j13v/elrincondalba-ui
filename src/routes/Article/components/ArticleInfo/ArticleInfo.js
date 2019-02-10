import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import IconEdit from '@material-ui/icons/Edit';
import { useAuthz } from '@global/hooks';

import { TextField } from '@material-ui/core';
import style from './ArticleInfo.style';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const useStyles = makeStyles(style);


export const ArticleInfo = ({
  loading,
  id,
  name,
  category,
  price,
  stock,
  description,
  onCreate,
  rating,
  onRequest,
  onEdit,
  onUpdate,
}) => {
  if (loading) {
    return 'LOADING';
  }

  const authz = useAuthz();
  const [state, setState] = useState({
    mode: 'view',
    name,
    category,
    price,
    description,
    rating,
  });
  const handleEdit = (evt) => {
    const mode = state.mode === 'edit' ? 'view' : 'edit';
    setState({
      ...state,
      mode,
    });
    onEdit(evt, mode);
  };
  const handleChange = key => (evt) => {
    setState({
      ...state,
      [key]: evt.target.value,
    });
  };
  const handleCreate = (evt) => {
    onCreate(evt, state);
  };
  const handleRequest = (evt) => {
    const mode = 'request';
    setState({
      ...state,
      mode,
    });
    onRequest(evt, mode);
  };
  const isEditing = state.mode === 'edit';
  return (


    <div>
      <h2>
        {!isEditing
          ? state.name
          : (
            <TextField
              value={state.name}
              onChange={handleChange('name')} />
          )}
        {authz.can('manage') && (
          <IconButton onClick={handleEdit} aria-label="Edit">
            <IconEdit />
          </IconButton>
        )}
      </h2>
      <small>
        {id}
      </small>
      <small>
        {!isEditing
          ? state.category
          : (
            <TextField
              value={state.category}
              onChange={handleChange('category')} />
          )}
      </small>

      {!isEditing
        ? <p>{`${state.price}€`}</p>
        : (
          <TextField
            value={state.price}
            type="number"
            onChange={handleChange('price')} />
        )}

      <p>Selecciona tu talla</p>
      <div>
        {sizes.map(($size, idx) => {
          const availableSize = stock.findIndex(({size}) => ($size === size)) !== -1;

          return (
            <span
              key={idx}
              style={{
                border: 'solid 1px #e5e5e5',
                padding: '0.5rem',
                fontWeight: 100,
                minWidth: '2em',
                display: 'inline-block',
                textAlign: 'center',
                cursor: 'pointer',
                color: availableSize ? 'inherit' : 'grey',
              }}>
              {$size}
            </span>
          );
        })}
      </div>
      {!isEditing
        ? <p>{state.description}</p>
        : (
          <TextField
            value={state.description}
            multiline
            rows={4}
            onChange={handleChange('description')} />
        )}
      {!isEditing
        ? <p>{state.rating}</p>
        : (
          <TextField
            value={state.rating}
            onChange={handleChange('rating')} />
        )}
      <Button onClick={onUpdate}>Update</Button>
      <Button onClick={handleRequest}>Solicitar articulo</Button>
      <Button onClick={handleCreate}>Crear articulo</Button>
    </div>
  );
};


ArticleInfo.propTypes = {
  onRequest: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};


export default ArticleInfo;

// <LoadableImage style={{height: '600px', width: '100%'}} />
