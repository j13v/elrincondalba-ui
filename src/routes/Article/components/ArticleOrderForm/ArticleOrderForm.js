import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonLink from '@global/components/ButtonLink';

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
  ...restProps
}) {
  const classes = useStyles();
  const [values, setValues] = useState({
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <ButtonLink
          to="../"
          variant="outlined"
          color="primary"
          className={classes.button}>
        Cancelar
        </ButtonLink>
        <Button
          onClick={evt => (onRequest(evt, values))}
          variant="outlined"
          color="primary"
          className={classes.button}>
        Enviar articulo
        </Button>
      </div>
    </div>
  );
}
ArticleOrderForm.propTypes = {
  stock: PropTypes.string.isRequired,
};
export default ArticleOrderForm;
