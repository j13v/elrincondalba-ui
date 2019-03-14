import React from 'react';
import gql from 'graphql-tag';
// Hooks
import {
  useMutation,
} from '@global/hooks';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './OrderCancelForm.style';


const CANCEL_ORDER = gql`
mutation($id: ObjectID!){
  cancelOrder(
    id: $id
  )
}`;

const useStyles = makeStyles(styles);
export const OrderCancelForm = ({
  ...restProps
}) => {
  const classes = useStyles(restProps);
  return (

    <div>
      <Typography>
            Indique las razones de la cancelación del pedido:
      </Typography>
      <TextField
        label="Motivo"
        multiline
        rowsMax="4"
        margin="normal"
        helperText="Escribe los motivos de la cancelación"
        variant="outlined"
        required
        fullWidth
        {...restProps}
      />
    </div>

  );
};
export const OrderCancelFormConfirmAction = ({
  id,
  value: trackingRef,
  suspend,
  onCancel,
  onSuccess,
  onError,
  ...restProps
}) => {
  const cancelOrder = useMutation(CANCEL_ORDER, {suspend});
  const handleConfirm = (id) => {
    console.log('ID CANCEL', id);
    cancelOrder({
      variables: {
        id,
      },
    }).then(onSuccess, onError);
  };
  return (
    <Button onClick={handleConfirm} color="primary" variant="outlined" autoFocus>
      Aceptar
    </Button>
  );
};
export default OrderCancelForm;
