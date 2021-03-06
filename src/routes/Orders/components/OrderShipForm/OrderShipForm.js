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
import styles from './OrderShipForm.style';

const SHIP_ORDER = gql`
mutation ($id: ObjectID!, $trackingRef: String!) {
  shipOrder(
    id: $id,
    trackingRef: $trackingRef)
    {
      id
    }
}
`;


const useStyles = makeStyles(styles);
export const OrderShipForm = ({
  ...restProps
}) => {

  const classes = useStyles(restProps);
  return (
    <div>
      <Typography>
            Este estado se actualizará de preparado a enviado(ship)
      </Typography>
      <TextField
        label="TrackNumber"
        className={classes.textField}
        name="trackNumber"
        margin="normal"
        variant="outlined"
        required
        fullWidth
        {...restProps}
      />
    </div>
  );
};

export const OrderShipFormConfirmAction = ({
  id,
  value: trackingRef,
  suspend,
  onCancel,
  onSuccess,
  onError,
  ...restProps
}) => {
  const shipOrder = useMutation(SHIP_ORDER, {suspend});
  const handleConfirm = () => {
    console.log('ID - TRacking', id, trackingRef);
    shipOrder({
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
export default OrderShipForm;
