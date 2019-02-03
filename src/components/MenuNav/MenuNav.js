import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Link from '../Link';
import styles from './MenuNav.style';


const useStyles = makeStyles(styles);

export const MenuNav = ({navs, ...restProps}) => {
  const classes = useStyles(restProps);
  return (
    <ul className={classes.root}>
      {navs.map(({link, name, active}, idx) => (
        <li key={idx} className={classNames(classes.nav, {[classes.active]: active})}>
          <Link to={link} className={classes.link}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

MenuNav.propTypes = {
  navs: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
};

MenuNav.defaultProps = {
  navs: [],
};

export default MenuNav;
