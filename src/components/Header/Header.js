import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { matchPath, withRouter } from 'react-router';
import { useRouter } from '../../hooks';
import MenuNav from '../MenuNav';
import logo from '../../assets/logo.svg';
import styles from './Header.style';

const useStyles = makeStyles(styles);

function Header({routes, location, ...restProps}) {
  const classes = useStyles(restProps);
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  function handleChange(event) {
    setAuth(event.target.checked);
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="sticky" color="default" elevation={1} className={classes.root}>
      <Toolbar className={classes.toolbar}>
        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        */}
        <img src={logo} alt="todo" />
        <Typography variant="h6" color="inherit" className={classes.brand}>
            D'Alba
        </Typography>
        <MenuNav navs={router.routes.filter(({menu}) => menu).map(route => ({
          active: !!matchPath(location.pathname, route),
          link: route.path,
          name: route.menu,
        }))} />
      </Toolbar>
    </AppBar>
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
