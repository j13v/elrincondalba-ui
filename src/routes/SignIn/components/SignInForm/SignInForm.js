import React, {useState} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// Hooks
import {
  useMutation,
  makeStyles,
} from '@global/hooks';
// MuiComponents
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// Styles
import styles from './SignInForm.style';


const GET_ACCESS_TOKEN = gql`
mutation($email: String!, $signature: String!){
  getAccessToken(
    email: $email,
    signature: $signature
  )
}
`;

const useStyles = makeStyles(styles);

export const SignInForm = ({
  suspend,
  ...restProps
}) => {

  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState();

  const classes = useStyles(restProps);
  const getAuthToken = useMutation(GET_ACCESS_TOKEN, {/* variables: {articleId}, */ suspend});

  const handleChange = (evt) => {
    setState({...state, [evt.target.name]: evt.target.value});
  };

  const handleSignIn = () => {
    const key = process.env.REACT_APP_SECRET;
    const {email, password} = state;
    const signature = require('crypto').createHmac('sha256', key)
      .update(`${email}:${password}`)
      .digest('base64');

    getAuthToken({
      variables: {
        email,
        signature,
      },
    }).then(({
      data: {getAccessToken},
    }) => {
      localStorage.setItem('token', getAccessToken);
      window.location.href = '/';
    },
    err => setError(err));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" autoComplete="email" autoFocus onChange={handleChange} />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Contraseña</InputLabel>
        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={handleChange} />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Recordar"
    />
      {error && <div>{error.toString()}</div>}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSignIn}
        className={classes.submit}
    >
      Acceder
      </Button>
    </form>
  );
};

export default SignInForm;


// const email = 'coco@cookies.com';
// const password = 'I love cupcakes';
