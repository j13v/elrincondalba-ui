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
import styles from './OrderPrepareForm.style';

const PREPARE_ORDER = gql`
mutation ($id: ObjectID!) {
  prepareOrder(
    id: $id
    )
}

`;

const useStyles = makeStyles(styles);
export const OrderPrepareForm = ({
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

export const OrderPrepareFormConfirmAction = ({
  id,
  value: trackingRef,
  suspend,
  onCancel,
  onSuccess,
  onError,
  ...restProps
}) => {
  const prepareOrder = useMutation(PREPARE_ORDER, {suspend});
  const handleConfirm = () => {
    console.log('ID - TRacking', id, trackingRef);
    prepareOrder({
      variables: {
        id,
        trackingRef,
      },
    }).then(onSuccess, onError);
  };
  return (
    <Button onClick={handleConfirm} color="primary" variant="outlined" autoFocus>
      Aceptar
    </Button>
  );
};
export default OrderPrepareForm;
