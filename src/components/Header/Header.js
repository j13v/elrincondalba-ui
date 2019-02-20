// Core
import React, {useState} from 'react';
import { matchPath, withRouter } from 'react-router';
// Mui Components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Hooks
import { useRouter, makeStyles, useWindowScroll } from '../../hooks';
// Local Components
import Link from '../Link';
import MenuNav from '../MenuNav';
// Assets
import logo from '../../assets/logo.svg';
// Styles
import styles from './Header.styles';


const useStyles = makeStyles(styles);
// https://media.istockphoto.com/photos/enjoying-freedom-picture-id617358390?s=2048x2048
// https://media.istockphoto.com/photos/beauty-woman-in-the-straw-in-field-picture-id488962217?s=2048x2048
function Header({routes, location, ...restProps}) {
  const classes = useStyles(restProps);
  const position = useWindowScroll({throttle: 100});
  const router = useRouter();
  const enableJumbo = window.location.pathname === '/';
  return (
    <div style={{height: enableJumbo ? window.innerHeight : 'auto', minHeight: '64px'}}>
      <AppBar
        position="sticky"
        color="default"
        style={{
          background: 'url(https://media.istockphoto.com/photos/enjoying-freedom-picture-id617358390?s=2048x2048) no-repeat center top fixed',
          backgroundSize: 'cover',
          position: 'fixed',
          transition: 'min-height 0.15s ease-out',
          minHeight: enableJumbo ? Math.max(0, window.innerHeight - position.y) : 0,
        }}
        className={classes.root}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          */}
          <img src={logo} alt="todo" />
          <Link className={classes.brand} to="/">
              D'Alba
          </Link>
          <MenuNav navs={router.routes.filter(({menu}) => menu).map(route => ({
            active: !!matchPath(location.pathname, route),
            link: route.path,
            name: route.menu,
          }))} />
        </Toolbar>
      </AppBar>
    </div>

  );
}

export default withRouter(Header);


//
// {auth && (
// <div>
//   <IconButton
//     aria-owns={open ? 'menu-appbar' : undefined}
//     aria-haspopup="true"
//     onClick={handleMenu}
//     color="inherit"
//       >
//     <AccountCircle />
//   </IconButton>
//   <Menu
//     id="menu-appbar"
//     anchorEl={anchorEl}
//     anchorOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     transformOrigin={{
//       vertical: 'top',
//       horizontal: 'right',
//     }}
//     open={open}
//     onClose={handleClose}
//       >
//     <MenuItem onClick={handleClose}>Profile</MenuItem>
//     <MenuItem onClick={handleClose}>My account</MenuItem>
//   </Menu>
// </div>
// )}
