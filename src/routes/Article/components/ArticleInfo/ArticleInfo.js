import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconEdit from '@material-ui/icons/Edit';
import IconClose from '@material-ui/icons/Close';
import { useAuthz } from '@global/hooks';
import {ROUTING_ARTICLE_ORDER} from '@global/constants/routing';
import Link from '@global/components/Link';
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


    <div style={{position: 'relative'}}>
      <div>
        {authz.can('manage') && (
        <Fab
          style={{
            position: 'absolute',
            right: '0',
            zIndex: 99,
          }}
          size="small"
          color="primary"
          onClick={handleEdit}
          aria-label="Editar">
          {isEditing ? <IconClose /> : <IconEdit />}
        </Fab>
        )}
        <h2>
          {isEditing
            ? (
              <TextField
                variant="outlined"
                fullWidth
                value={state.name}
                onChange={handleChange('name')} />
            )
            : state.name}
        </h2>
      </div>
      <div>
        <small>
          {id}
        </small>
      </div>
      <div>
        <small>
          {isEditing
            ? (
              <TextField
                variant="outlined"
                fullWidth
                value={state.category}
                onChange={handleChange('category')} />
            )
            : state.category}
        </small>
      </div>
      {isEditing
        ? (
          <TextField
            variant="outlined"
            fullWidth
            value={state.price}
            type="number"
            onChange={handleChange('price')} />
        )
        : <p>{`${state.price}€`}</p>}

      <div style={{display: isEditing ? 'none' : 'block'}}>
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
      </div>
      <div>
        <div>
          {!isEditing
            ? <p>{state.rating}</p>
            : (
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                min={0}
                max={5}
                value={state.rating}
                onChange={handleChange('rating')} />
            )}
        </div>
        <div>
          {!isEditing
            ? <p>{state.description}</p>
            : (
              <TextField
                fullWidth
                variant="outlined"
                value={state.description}
                multiline
                rows={4}
                onChange={handleChange('description')} />
            )}
        </div>
      </div>
      <Button onClick={onUpdate}>Update</Button>
      <Link to={ROUTING_ARTICLE_ORDER} params={{articleId: id}}>Solicitar articulo</Link>
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
