import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
}));


function ArticleOrderForm({
  stock,
  onRequest,
  ...restProps
}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    phone: '',
    notes: '',
    stock,
  });

  const handleChange = field => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,

    });

  };
  return (
    <div {...restProps}>
      <div>
        <TextField
          id="outlined-name"
          fullWidth
          label="Nombre"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          id="outlined-surname"
          fullWidth
          label="Apellidos"
          className={classes.textField}
          value={values.surname}
          onChange={handleChange('surname')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          id="outlined-email"
          fullWidth
          label="Email"
          className={classes.textField}
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          id="outlined-address"
          fullWidth
          label="Direccion"
          className={classes.textField}
          value={values.address}
          onChange={handleChange('address')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          id="outlined-phone"
          fullWidth
          label="Telefono"
          className={classes.textField}
          value={values.phone}
          onChange={handleChange('phone')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          id="outlined-multiline-notes"
          fullWidth
          label="Notas"
          multiline
          rows="4"
          value={values.multiline}
          onChange={handleChange('notes')}
          className={classes.textField}
          margin="normal"
          placeholder="Introduzca un comentario sobre la solicitud"
          variant="outlined"
      />
      </div>
      <div>
        <Button onClick={evt => (onRequest(evt, values))} variant="contained" color="primary" className={classes.button}>
        Solicitar articulo
        </Button>
      </div>

    </div>
  );
}
ArticleOrderForm.propTypes = {
  onRequest: PropTypes.func.isRequired,
  stock: PropTypes.string.isRequired,
};
export default ArticleOrderForm;
