import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import RatingStars from '../RatingStars';
import LoadableImage from '../LoadableImage';
import styles from './ArticleGridItem.style';


const useStyles = makeStyles(styles);

export const ArticleGridItem = ({
  name,
  description,
  price,
  category,
  rating,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  return (
    <Grid item xs={12} sm={6} md={3}>
      <div className={classes.imageBox}>
        <LoadableImage
          className={classes.image}
          style={{
            width: '100%',
            minHeight: '314px',
          }} />
        <div className={classes.imageInset}>
          <Button>DETALLE</Button>
        </div>
      </div>
      <div>
        <h3 className={classes.infoName}>{name}</h3>
        <small className={classes.infoPrice}>{price}</small>
        <RatingStars className={classes.ratingStars} value={rating} />
      </div>
    </Grid>);
};

ArticleGridItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number,
};

ArticleGridItem.defaultProps = {
  rating: 0,
};

export default ArticleGridItem;