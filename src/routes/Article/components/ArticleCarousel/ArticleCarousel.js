// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import { makeStyles } from '@material-ui/styles';
import { useKeyDown } from '@global/hooks';
// Components
import LoadableImage from '@global/components/LoadableImage';
import styles from './ArticleCarousel.styles';


export const useStyles = makeStyles(styles);

export const ArticleCarousel = ({
  images,
  ...restProps
}) => {

  const [selected, setSelected] = useState(0);
  const classes = useStyles(restProps);

  useKeyDown((evt) => {
    switch (evt.key) {
      case 'ArrowLeft':
        setSelected(selected - 1);
        break;
      case 'ArrowRight':
        setSelected(selected + 1);
        break;
      default:
        break;
    }
  });

  const handleClick = idx => (evt) => {
    setSelected(idx);
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

export default ArticleCarousel;
