import React from 'react';
import { makeStyles } from '@material-ui/styles';
import styles from './Footer.style';

const useStyles = makeStyles(styles);

const Footer = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.main}>&nbsp;</div>
      <div className={classes.ending}>&nbsp;</div>
    </div>
  );
};

export default Footer;
