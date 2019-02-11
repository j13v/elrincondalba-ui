// Core
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// MuiComponents
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
// LocalComponents
import SignInForm from '../SignInForm';
// Styles
import styles from './SignInView.style';


export const useStyles = makeStyles(styles);

export const SignIn = (props) => {

  const classes = useStyles(props);

  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acceso
        </Typography>
        <SignInForm />
      </Paper>
    </main>
  );
};

export default SignIn;
