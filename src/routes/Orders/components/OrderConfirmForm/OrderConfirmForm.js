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
import styles from './OrderConfirmForm.style';

const CONFIRM_ORDER = gql`
mutation ($id: ObjectID!) {
  confirmReceived(
    id: $id
    ){
      id
    }
}

`;

const useStyles = makeStyles(styles);
export const OrderConfirmForm = ({
  ...restProps
}) => {
  const classes = useStyles(restProps);
  return (
    <div>
      <Typography>
            Escribe el mensaje dirigido al cliente, confirmado la tramitacion de su pedido
      </Typography>
      <TextField
        label="Mensaje"
        className={classes.textField}
        name="trackNumber"
        multiline
        rowsMax="4"
        margin="normal"
        variant="outlined"
        required
        fullWidth
        {...restProps}
      />
    </div>
  );
};

export const OrderConfirmFormConfirmAction = ({
  id,
  value: trackingRef,
  suspend,
  onCancel,
  onSuccess,
  onError,
  ...restProps
}) => {
  const confirmOrder = useMutation(CONFIRM_ORDER, {suspend});
  const handleConfirm = () => {
    confirmOrder({
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
export default OrderConfirmForm;
