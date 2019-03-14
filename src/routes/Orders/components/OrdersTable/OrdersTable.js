import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
// Hooks
import {
  useMutation,
} from '@global/hooks';
import {withGraphQL} from '@global/utils/relay';
import IconButton from '@material-ui/core/IconButton';
import IconCancel from '@material-ui/icons/Cancel';
import IconUpdate from '@material-ui/icons/Update';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import 'moment/locale/es';
import WrappedVirtualizedTable from '@global/components/VirtualizedTable';
import OrderPrepareForm, {OrderPrepareFormConfirmAction} from '../OrderPrepareForm';
import OrderShipForm, {OrderShipFormConfirmAction} from '../OrderShipForm';
import OrderCancelForm, {OrderCancelFormConfirmAction} from '../OrderCancelForm';


moment.locale('es');
const ORDERS = gql`
{
  listOrders {
    edges {
      node {
        id
        user {
          name
        }
        state
        notes
        createdAt
        stock {
          size
          article {
            name
          }
        }
      }
    }
  }
}
`;


const stateEnum = [
  'PENDIENTE',
  'PAGADO',
  'PREPARANDO',
  'ENVIADO',
  'RECIBIDO',
  'CANCELADO',
];

const stateDialogTitles = [
  'Preparar pedido',
  'Enviar pedido',
];

const stateForms = [
  OrderPrepareForm,
  OrderShipForm,
];

const stateFormsAction = [
  OrderPrepareFormConfirmAction,
  OrderShipFormConfirmAction,
];


const columnsDefinitions = [
  {
    width: 200,
    flexGrow: 1.0,
    label: 'ID Pedido',
    dataKey: 'id',
  },
  {
    width: 200,
    flexGrow: 1.0,
    label: 'Articulo',
    dataKey: 'article',
  },
  {
    width: 200,
    flexGrow: 1.0,
    label: 'Size',
    dataKey: 'size',
  },
  {
    width: 120,
    label: 'Estado',
    dataKey: 'state',
  },
  {
    width: 120,
    label: 'Usuario',
    dataKey: 'user',
  },
  {
    width: 120,
    label: 'Notas',
    dataKey: 'notes',
  },
  {
    width: 120,
    label: 'Fecha',
    dataKey: 'createdAt',
  },
  {
    width: 120,

    label: 'Actualizar estado',
    dataKey: 'update',
  },
  {
    width: 120,

    label: 'Cancelar',
    dataKey: 'cancel',
  },
];


const mapOrders = (orders, onAction) => orders.map((order, idx) => {
  const orderState = order.state = idx % stateEnum.length;
  const isCancelled = orderState !== stateEnum.length - 1;
  return ({
    ...order,
    state: <Chip label={stateEnum[orderState]} style={{backgroundColor: orderState === 5 ? 'red' : 'auto'}} />,
    user: order.user.name,
    article: order.stock.article.name,
    size: order.stock.size,
    createdAt: moment.unix(order.createdAt).format('LLL'),
    update:
  <IconButton disabled={!isCancelled} onClick={evt => onAction(order)}>
    <IconUpdate />
  </IconButton>,
    cancel:
  <IconButton disabled={!isCancelled} onClick={evt => onAction(order, -1)}>
    <IconCancel />
  </IconButton>,
  });
});

const OrdersTable = ({orders, suspend, ...restProps}) => {

  const [state, setState] = useState({});
  const [value, setValue] = useState('');
  const actionIndex = state.action;
  const DialogComponent = actionIndex === -1 ? OrderCancelForm : stateForms[actionIndex];
  const DialogComponentActionConfirm = actionIndex === -1 ? OrderCancelFormConfirmAction : stateFormsAction[actionIndex];

  const dialogTitle = actionIndex === -1 ? 'Cancelar producto' : stateDialogTitles[actionIndex];

  const handleClose = () => {
    setState({});
  };
  if (!orders) {
    return 'Data not loaded';
  }

  const data = mapOrders(orders, (order, isCancel) => {
    setState({order, action: isCancel || (order.state - 1)});
  });
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        columns={columnsDefinitions}
      />
      {DialogComponent && (
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={!!DialogComponent}
        onClose={handleClose}
        >
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogComponent
            value={value}
            onChange={(evt, value) => setValue(value || evt.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancelar
          </Button>
          <DialogComponentActionConfirm
            id={state.order.id}
            value={value}
            onSuccess={handleClose}
            onError={console.error()}
          />
        </DialogActions>
      </Dialog>
      )}
    </Paper>
  );
};

export default withGraphQL(ORDERS, ({
  listOrders: orders,
}) => ({
  orders,
}))(OrdersTable);
