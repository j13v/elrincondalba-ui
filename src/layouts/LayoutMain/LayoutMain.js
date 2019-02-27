// Core
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// Local Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
// Styles
import styles from './LayoutMain.style';


const useStyles = makeStyles(styles);

export const LayoutMain = ({children, ...restProps}) => {

  const classes = useStyles(restProps);
  return (
    <div className={classes.root}>
      <Header className={classes.header} />
      <div className={classes.container}>
        <div className={classes.breadcrumbs}><Breadcrumbs /></div>
        {children}
      </div>
      <Footer className={classes.footer} />
    </div>
  );
};

export default LayoutMain;
