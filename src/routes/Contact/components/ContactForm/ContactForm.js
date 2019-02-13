import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
}));

const subjects = [
  {
    value: '1',
    label: 'Atencion cliente',
  },
  {
    value: '2',
    label: 'Estado pedido',
  },
  {
    value: '3',
    label: 'Informacion artículos',
  },
  {
    value: '4',
    label: 'Devoluciones',
  },
];
function ContactForm({
  stock,
  onRequest,
}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = field => (event) => {
    setValues({
      ...values,
      [field]: event.target.value,

    });

  };
  return (
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <TextField
          id="outlined-phone"
          label="Telefono"
          className={classes.textField}
          value={values.phone}
          onChange={handleChange('phone')}
          margin="normal"
          variant="outlined"
          required
      />
        <TextField
          style={{flexGrow: 1}}
          id="standard-select-subject"
          select
          label="Asunto"
          className={classes.textField}
          value={values.subject}
          onChange={handleChange('subject')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Selecciona el asunto"
          margin="normal"
          variant="outlined"
    >
          {subjects.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <TextField
        id="outlined-multiline-message"
        fullWidth
        label="Mensaje"
        multiline
        rows="10"
        value={values.multiline}
        onChange={handleChange('message')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <div>
        <Button onClick={evt => console.log('Enviar contacto')} variant="contained" color="primary" className={classes.button}>
      Enviar
        </Button>
      </div>
    </div>
  );
}
ContactForm.propTypes = {
  onRequest: PropTypes.func.isRequired,
};
export default ContactForm;
