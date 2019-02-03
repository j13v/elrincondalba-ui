import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Link from '../Link';
import styles from './MenuNavItem.style';


const useStyles = makeStyles(styles);

export const MenuNavItem = ({
  name, active, link, ...restProps
}) => {
  const classes = useStyles(restProps);
  return (
    <li className={classNames(classes.root, {[classes.active]: active})}>
      <Link to={link} className={classes.link}>{name}</Link>
    </li>
  );
};

MenuNavItem.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

MenuNavItem.defaultProps = {
  active: false,
};

export default MenuNavItem;
