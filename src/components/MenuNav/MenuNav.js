import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import MenuNavItem from './MenuNavItem';
import styles from './MenuNav.style';


const useStyles = makeStyles(styles);

export const MenuNav = ({navs, ...restProps}) => {
  const classes = useStyles(restProps);
  return (
    <ul className={classes.root}>
      {navs.map(({link, name, active}, idx) => (
        <MenuNavItem key={idx} link={link} name={name} active={active} />
      ))}
    </ul>
  );
};

MenuNav.propTypes = {
  navs: PropTypes.arrayOf(PropTypes.object),
};

MenuNav.defaultProps = {
  navs: [],
};

export default MenuNav;
