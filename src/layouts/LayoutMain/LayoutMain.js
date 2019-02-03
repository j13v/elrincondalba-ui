// Core
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// MuiComponents
import Grid from '@material-ui/core/Grid';
// Local Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import withStyles from '../../styles/withStyles';
// Styles
import styles from './LayoutMain.style';


const useStyles = makeStyles(styles);

export const LayoutMain = ({routes, children, ...restProps}) => {

  const classes = useStyles(restProps);

  return (
    <div className={classes.root}>
      <Header className={classes.header} routes={routes} />
      <Grid className={classes.container} container spacing={16}>{children}</Grid>
      <Footer className={classes.footer} />
    </div>
  );
};


LayoutMain.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LayoutMain;
