// Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
// Hooks
import {
  useQuery,
  useAuthz,
  useTheme,
  makeStyles,
} from '@global/hooks';
// Constants
import {
  ROUTING_ARTICLE_ORDER,
  ROUTING_ARTICLE_CREATE,
  ROUTING_ARTICLE_EDIT,
} from '@global/constants/routing';
// Components
import SwipeableViews from 'react-swipeable-views';
// Mui Components
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconEdit from '@material-ui/icons/Edit';
import IconClose from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
// Global Components
import Link from '@global/components/Link';
import RatingStars from '@global/components/RatingStars';
import PriceLabel from '@global/components/PriceLabel';
import ButtonLink from '@global/components/ButtonLink';
import ContentEditable from '@global/components/ContentEditable';
// Local Components
import ArticleSizeSelector, { parseSizes } from '../ArticleSizeSelector';
// Styles
import styles from './ArticleInfo.styles';

export const useStyles = makeStyles(styles);
export const isAvailableSize = (stock, csize) => stock && stock.findIndex(({size}) => (csize === size)) !== -1;

const GET_ARTICLE_BY_ID = gql`
query($articleId: ObjectID!){
  getArticle(id: $articleId) {
    id
    name
    description
    category
    price
    rating
    stock {
      count
      refs
      size
    }
    createdAt
    updatedAt
  }
}
`;

export const ArticleInfo = ({
  articleId,
  suspend,
  sizes,
  // onCreate,
  // onRequest,
  // onEdit,
  // onUpdate,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const authz = useAuthz();
  const {
    data: {
      getArticle: article,
    },
    error,
  } = useQuery(GET_ARTICLE_BY_ID, {variables: {articleId}, suspend});
  const [state, setState] = useState({...article});

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
  // const isEditing = state.mode === 'edit';
  const isEditing = true;
  const handleSizeSelectorChange = (evt) => {
    setState({
      ...state,
      selectedSize: state.selectedSize === evt.target.value ? null : evt.target.value,
    });
  };

  const handleChangeIndex = (index) => {
    console.log(index);
  };
  console.log(state.stock);
  return (
    <div style={{position: 'relative'}}>
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
      <div className={classes.briefBox}>
        <div>
          <span>Ref:&nbsp;</span>
          <span>{state.id}</span>
        </div>
        <div>
          <span>Categoria:&nbsp;</span>
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
      <RatingStars value={state.rating} />
      <PriceLabel value={state.price} style={{fontSize: '36px'}} />
      <p>Selecciona tu talla</p>
      <ArticleSizeSelector
        value={state.selectedSize}
        onChange={handleSizeSelectorChange}
        sizes={parseSizes(sizes).map(item => ({
          ...item,
          disabled: !isAvailableSize(state.stock, item.label),
        }))} />

      <ContentEditable
        tagName="p"
        className={classes.description}
        content={state.description}
        editable={isEditing}
        maxLength={250}
        multiLine
        onChange={handleChange('description')}
            />
    </div>
  );
};


// <Button onClick={onUpdate}>Update</Button>
// <ButtonLink to={ROUTING_ARTICLE_ORDER} params={{articleId: state.id}}>Solicitar articulo</ButtonLink>
// <ButtonLink to={ROUTING_ARTICLE_CREATE}>Crear Articulo</ButtonLink>
// <ButtonLink to={ROUTING_ARTICLE_EDIT}>Crear Articulo</ButtonLink>
// <Button onClick={handleCreate}>Crear articulo</Button>
// <SwipeableViews
//   axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//   index={0}
//   onChangeIndex={handleChangeIndex}>
//   {sizes.map(size => <div dir={theme.direction}>{size}</div>)}
// </SwipeableViews>
ArticleInfo.propTypes = {
  suspend: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.string),
  // loading: PropTypes.bool.isRequired,
  // onRequest: PropTypes.func.isRequired,
  // onEdit: PropTypes.func.isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

ArticleInfo.defaultProps = {
  suspend: true,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
};
// name={name}
// category={category}
// price={price}
// rating={rating}
// description={description}

export default ArticleInfo;

// <LoadableImage style={{height: '600px', width: '100%'}} />
