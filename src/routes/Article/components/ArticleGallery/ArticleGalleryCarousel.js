// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import { makeStyles } from '@material-ui/styles';
import { useKeyDown } from '@global/hooks';
// Components
import LoadableImage from '@global/components/LoadableImage';
import styles from './ArticleGalleryCarousel.styles';


export const useStyles = makeStyles(styles);

export const ArticleGalleryCarousel = ({
  edit,
  images,
  selected = 0,
  onChange,
  onAddImage,
  ...restProps
}) => {
  const classes = useStyles(restProps);

  const setSelected = (evt, index, inc = 0) => {
    onChange(evt, (index + images.length + inc) % images.length);
  };

  useKeyDown((evt) => {
    switch (evt.key) {
      case 'ArrowLeft':
        setSelected(evt, selected, -1);
        break;
      case 'ArrowRight':
        setSelected(evt, selected, +1);
        break;
      default:
        break;
    }
  });

  const handleClick = idx => (evt) => {
    setSelected(evt, idx);
  };


  return (
    <div className={classes.root}>
      {images.map((src, idx) => (
        <LoadableImage
          key={idx}
          image={src}
          onClick={handleClick(idx)}
          className={classNames(classes.image, {
            [classes.selected]: idx === selected,
          })}
       />
      ))}
      {edit && (
        (new Array(6 - images.length)).fill(null).map(() => (
          <button
            type="button"
            className={classNames(classes.image, classes.add)}
            onClick={onAddImage} />
        )))}
    </div>
  );
};

ArticleGalleryCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

ArticleGalleryCarousel.defaultProps = {
  images: [],
  onChange: null,
};

export default ArticleGalleryCarousel;
