import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
// MuiComponents
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// Styles
import styles from './SignInForm.style';


const useStyles = makeStyles(styles);

export const SignInForm = (props) => {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <Input name="password" type="password" id="password" autoComplete="current-password" />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Recordar"
    />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
    >
      Acceder
      </Button>
    </div>
  );
};

export default SignInForm;
