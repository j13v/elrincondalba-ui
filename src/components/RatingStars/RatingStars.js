// Core
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
// MuiIcons
import IconStarBorder from '@material-ui/icons/StarBorder';
import IconStar from '@material-ui/icons/Star';
// Styles
import styles from './RatingStars.style';


const useStyles = makeStyles(styles);

export const RatingStars = ({className, value, ...restProps}) => {
  const classes = useStyles(restProps);
  return (
    <ul className={classNames(classes.root, className)}>
      {(new Array(5)
        .fill(null))
        .map((_, idx) => (
          <li key={idx}>
            {value <= idx ? <IconStarBorder key={idx} /> : <IconStar />}
          </li>
        ))}
    </ul>
  );
};

RatingStars.propTypes = {
  value: PropTypes.number,
};

RatingStars.defaultProps = {
  value: 0,
};

export default RatingStars;
