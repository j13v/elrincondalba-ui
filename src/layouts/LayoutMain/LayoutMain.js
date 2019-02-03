// Core
import React from 'react';
import PropTypes from 'prop-types';
// MuiComponents
import Grid from '@material-ui/core/Grid';
// Local Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import withStyles from '../../styles/withStyles';
// Styles
import styles from './LayoutMain.style';

export const LayoutMain = ({ classes, routes, children }) => (
  <div className={classes.root}>
    <Header className={classes.header} routes={routes} />
    <Grid className={classes.container} container spacing={16}>{children}</Grid>
    <Footer className={classes.footer} />
  </div>
);


LayoutMain.propTypes = {
  classes: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles, {
  name: 'LayoutMain',
})(LayoutMain);
