// Core
import React from 'react';
// Local Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import withStyles from '../../styles/withStyles';
// Styles
import styles from './LayoutMain.style';

export const LayoutMain = ({ classes, title, children }) => (
  <div className={classes.root}>
    <Header className={classes.header} title={title} />
    <div>{children}</div>
    <Footer className={classes.footer} />
  </div>
);

export default withStyles(styles, {
  name: 'LayoutMain',
})(LayoutMain);
