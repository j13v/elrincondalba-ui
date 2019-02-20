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
  images,
  selected = 0,
  onChange,
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

  return images.map((src, idx) => (
    <LoadableImage
      onClick={handleClick(idx)}
      key={idx}
      image={src}
      style={{
        height: '100px',
        width: '100%',
        filter: idx === selected ? 'none' : 'brightness(50%)',
        cursor: 'pinter',
      }} />
  ));
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
