import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const OrderShipForm = () => {
  const [value, setValue] = React.useState('cancel');
  return (
    <div>
    Actualizar el estado del pedido:
      <RadioGroup

        value={value}
        onChange={evt => (console.log('ESTADO:', evt.target.value) || setValue(evt.target.value))}
        >
        <FormControlLabel value="shipping" control={<Radio />} label="Enviado" />
        <FormControlLabel value="cancel" control={<Radio />} label="Cancelar" />
      </RadioGroup>
      <Button onClick={evt => (console.log('Cancelar'))}>Cancelar</Button>
      <Button onClick={evt => (console.log('Aceptar'))}>Aceptar</Button>
    </div>
  );
};

export default OrderShipForm;
