// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
// Hooks
import {
  useQuery,
  makeStyles,
} from '@global/hooks';
// Mui Components
import Grid from '@material-ui/core/Grid';
// Local Components
import ArticleGalleryCarousel from './ArticleGalleryCarousel';
import ArticleGalleryMainImage from './ArticleGalleryMainImage';
// Styles
import styles from './ArticleGallery.styles';


const GET_ARTICLE_IMAGES_BY_ID = gql`
query($articleId: ObjectID!){
  getArticle(id: $articleId) {
    images
  }
}
`;

export const useStyles = makeStyles(styles);

export const ArticleGallery = ({
  suspend,
  articleId,
  ...restProps
}) => {
  const [state, setState] = useState({});
  const classes = useStyles(restProps);
  const {
    data: {
      getArticle: {images: articleImages},
    },
    error,
  } = useQuery(GET_ARTICLE_IMAGES_BY_ID, {variables: {articleId}, suspend});
  const [images, setImages] = useState(articleImages.map(image => `/images/${image}`));
  const [index, setIndex] = useState(0);

  const handleChange = (evt, index) => {
    setIndex(index);
  };

  return (
    <Grid container spacing={16}>
      <Grid item xs={2}>
        <ArticleGalleryCarousel
          images={images}
          onChange={handleChange} />
      </Grid>
      <Grid item xs={10}>
        <ArticleGalleryMainImage
          image={images[index]} />
      </Grid>
    </Grid>
  );
};

export default ArticleGallery;
