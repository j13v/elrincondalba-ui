// Core
import React, {useState, useEffect} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
import LoadableImage from '@global/components/LoadableImage';

const FETCH_ARTICLE_DATA = gql`
 query GetArticle($id:String!){
  listSizes
  getArticle(id: $id) {
    id
    name
    description
    category
    images
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

export const ArticleView = ({
  article,
  loading,
  sizes,
  ...restProps
}) => {
  if (loading) {
    return 'LOADING';
  }
  if (!article) {
    return 'Este articulo no existe';
  }
  const pepe = '';
  return (
    <Grid container spacing={16}>
      <Grid item xs={1}>
        {article.images.map((_, idx) => (
          <LoadableImage
            key={idx}
            style={{
              height: '100px',
              width: '100%',
            }} />
        ))}
      </Grid>
      <Grid item xs={5}>
        <LoadableImage style={{height: '600px', width: '100%'}} />
      </Grid>
      <Grid item xs={6}>
        <h2>
          {article.name}
        </h2>
        <small>
          {article.id}
        </small>
        <small>{article.category}</small>
        <p>
          {`${article.price}€`}
        </p>
        <p>Selecciona tu talla</p>
        <div>
          {sizes.map(($size, idx) => {
            const availableSize = article.stock.findIndex(({size}) => ($size === size)) !== -1;

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
        <p>{article.description}</p>
      </Grid>
    </Grid>
  );
};

const mapQueryToProps = ({
  data: {
    loading,
    getArticle,
    listSizes,
    ...restData
  }, ownProps,

}) => ({
  article: getArticle,
  loading,
  sizes: listSizes,
  ...ownProps,
});


export default graphql(FETCH_ARTICLE_DATA, {
  props: mapQueryToProps,
  options: ownProps => ({variables: {id: ownProps.params.articleId}}),
})(ArticleView);
