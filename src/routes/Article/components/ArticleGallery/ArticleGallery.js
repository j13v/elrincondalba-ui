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
  edit,
  articleId,
  ...restProps
}) => {
  const [state, setState] = useState({});
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleDrop = (files) => {
    setPreviews([...previews, ...files.map(file => URL.createObjectURL(file))]);
    setFiles(files);
  };

  const classes = useStyles(restProps);
  const {
    data: {
      getArticle: {images: articleImages},
    },
    error,
  } = useQuery(GET_ARTICLE_IMAGES_BY_ID, {variables: {articleId}, suspend});
  const [selectedImage, setSelectedImage] = useState(articleImages.length ? 0 : -1);
  const [images, setImages] = useState(articleImages.map(image => `/images/${image}`));

  const handleChange = (evt, index) => {
    setSelectedImage(index);
  };

  const handleAddImage = () => {

  };

  return (
    <Grid container spacing={16}>
      <Grid item xs={2}>
        <ArticleGalleryCarousel
          edit={edit}
          selected={selectedImage}
          images={[...images, ...previews]}
          onChange={handleChange}
          onAddImage={handleAddImage} />
      </Grid>
      <Grid item xs={10}>
        <ArticleGalleryMainImage
          edit={edit}
          onDrop={handleDrop}
          image={[...images, ...previews][selectedImage]} />
      </Grid>
    </Grid>
  );
};

export default ArticleGallery;
