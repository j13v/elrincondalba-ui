import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import IconArrowLeft from '@material-ui/icons/ChevronLeft';
import IconArrowRight from '@material-ui/icons/ChevronRight';
import ImageCarousel from '@global/components/ImageCarousel';
import Link from '@global/components/Link';
import RatingStars from '@global/components/RatingStars';
import LoadableImage from '@global/components/LoadableImage';
import styles from './ArticleItem.style';

const useStyles = makeStyles(styles);

const useSlide = () => {
  const [index, setIndex] = React.useState(0);
  return [index, setIndex, () => setIndex(index - 1), () => setIndex(index + 1)];
};
// className={classes.image}
// style={{
//   width: '100%',
//   minHeight: '314px',
// }}

export const ArticleItem = ({
  id,
  name,
  description,
  price,
  category,
  rating,
  routing,
  images,
  style,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  const [index, setIndex, prev, next] = useSlide();

  return (
    <div className={classes.root} style={style}>
      <div className={classes.media}>
        <ImageCarousel onChange={setIndex} index={index}>
          <LoadableImage
            className={classes.image}
            style={{
              width: '100%',
              minHeight: '314px',
            }} />
        </ImageCarousel>
        <div className={classes.overlay}>
          <div className={classes.controls}>
            <IconButton onClick={prev} className={classNames(classes.control, classes.controlsRight)}>
              <IconArrowLeft />
            </IconButton>
            <IconButton onClick={next} className={classNames(classes.control, classes.controlsRight)}>
              <IconArrowRight />
            </IconButton>
          </div>
        </div>
      </div>
      <div>
        <Link className={classes.infoName} to={routing} params={{articleId: id}}>{name}</Link>
        <small className={classes.infoPrice}>{price}</small>
        <RatingStars className={classes.ratingStars} value={rating} />
      </div>
    </div>);
};

ArticleItem.propTypes = {
  routing: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

ArticleItem.defaultProps = {
  rating: 0,
  routing: '',

};

export default ArticleItem;
