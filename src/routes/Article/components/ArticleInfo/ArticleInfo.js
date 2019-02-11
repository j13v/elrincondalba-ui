// Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconEdit from '@material-ui/icons/Edit';
import IconClose from '@material-ui/icons/Close';
import { useAuthz } from '@global/hooks';
import {ROUTING_ARTICLE_ORDER} from '@global/constants/routing';
import Link from '@global/components/Link';
import RatingStars from '@global/components/RatingStars';
import PriceLabel from '@global/components/PriceLabel';
import TextField from '@material-ui/core/TextField';
import ContentEditable from 'react-sane-contenteditable';
import styles from './ArticleInfo.styles';
import ArticleSizeSelector, { parseSizes } from '../ArticleSizeSelector';

console.log(parseSizes);

export const sizes = ['XS', 'S', 'M', 'L', 'XL'];
export const useStyles = makeStyles(styles);
export const isAvailableSize = (stock, csize) => stock.findIndex(({size}) => (csize === size)) !== -1;


export const ArticleInfo = ({
  loading,
  article,
  onCreate,
  onRequest,
  onEdit,
  onUpdate,
}) => {
  if (loading) {
    return 'LOADING';
  }

  const {
    id,
    name,
    category,
    price,
    stock,
    description,
    rating,
  } = article;
  const classes = useStyles();
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
  const handleChange = key => (evt, value) => {
    setState({
      ...state,
      [key]: value || evt.target.value,
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
        <ContentEditable
          tagName="h2"
          className="my-class"
          style={{
            fontSize: '48px',
            fontWeight: '100',
            margin: '0.5rem 0',
          }}
          content={state.name}
          editable={isEditing}
          maxLength={140}
          multiLine={false}
          onChange={handleChange('name')}
          />
      </div>
      <div style={{
        fontSize: '14px',
        color: '#bcbcbc',
        backgroundImage: 'linear-gradient(to left, #bcbcbc 33%, rgba(255,255,255,0) 0%)',
        backgroundPosition: 'bottom',
        backgroundSize: '20px 1px',
        backgroundRepeat: 'repeat-x',
        padding: '0em 0 1em 0',
        lineHeight: '1.5',
        margin: '1em 0',
      }}>
        <div>
          Ref:&nbsp;
          <span>{id}</span>
        </div>
        <div>
          Categoria:&nbsp;
          <ContentEditable
            tagName="span"
            className="my-class"
            content={state.category}
            editable={isEditing}
            maxLength={140}
            multiLine={false}
            onChange={handleChange('category')}
          />
        </div>
      </div>
      <PriceLabel value={state.price} style={{fontSize: '36px'}} />
      <p>Selecciona tu talla</p>
      <ArticleSizeSelector sizes={parseSizes(sizes).map(item => ({
        ...item,
        disabled: isAvailableSize(stock, item.label),
      }))} />
      <RatingStars value={state.rating} />
      <ContentEditable
        tagName="p"
        className={classes.description}
        content={state.description}
        editable={isEditing}
        maxLength={250}
        multiLine
        onChange={handleChange('description')}
            />
      <Button onClick={onUpdate}>Update</Button>
      <Link to={ROUTING_ARTICLE_ORDER} params={{articleId: id}}>Solicitar articulo</Link>
      <Button onClick={handleCreate}>Crear articulo</Button>
    </div>
  );
};


ArticleInfo.propTypes = {
  loading: PropTypes.bool.isRequired,
  onRequest: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// name={name}
// category={category}
// price={price}
// rating={rating}
// description={description}

export default ArticleInfo;

// <LoadableImage style={{height: '600px', width: '100%'}} />
