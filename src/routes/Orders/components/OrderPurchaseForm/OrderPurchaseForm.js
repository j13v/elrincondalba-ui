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
import styles from './OrderPurchaseForm.style';

const PURCHASE_ORDER = gql`
mutation ($id: ObjectID!) {
  purchaseOrder(
    id: $id,
    paymentMethod: 0,
    paymentRef: "1234"
    ){
      id
    }
}

`;

const useStyles = makeStyles(styles);
export const OrderPurchaseForm = ({
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

export const OrderPurchaseFormConfirmAction = ({
  id,
  value: trackingRef,
  suspend,
  onCancel,
  onSuccess,
  onError,
  ...restProps
}) => {
  const purchaseOrder = useMutation(PURCHASE_ORDER, {suspend});
  const handleConfirm = () => {
    purchaseOrder({
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
export default OrderPurchaseForm;
