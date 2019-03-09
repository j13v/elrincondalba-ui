import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
import {withGraphQL} from '@global/utils/relay';
import { withStyles } from '@material-ui/core/styles';
import IconCancel from '@material-ui/icons/Cancel';
import IconUpdate from '@material-ui/icons/Update';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import moment from 'moment';
import 'moment/locale/es';
import {
  AutoSizer, Column, SortDirection, Table,
} from 'react-virtualized';
import OrderShipForm from '../OrderShipForm';
import OrderCancelForm from '../OrderCancelForm';

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

const styles = theme => ({
  table: {
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  getRowClassName = ({ index }) => {
    const { classes, rowClassName, onRowClick } = this.props;

    return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex = null }) => {
    const {
      columns, classes, rowHeight, onRowClick,
    } = this.props;
    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({
    label, columnIndex, dataKey, sortBy, sortDirection,
  }) => {
    const {
      headerHeight, columns, classes, sort,
    } = this.props;
    const direction = {
      [SortDirection.ASC]: 'asc',
      [SortDirection.DESC]: 'desc',
    };

    const inner = !columns[columnIndex].disableSort && sort != null ? (
      <TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
        {label}
      </TableSortLabel>
    ) : (
      label
    );

    return (
      <TableCell
        component="div"
        className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        {inner}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            className={classes.table}
            height={height}
            width={width}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({
              cellContentRenderer = null, className, dataKey, ...other
            }, index) => {
              let renderer;
              if (cellContentRenderer != null) {
                renderer = cellRendererProps => this.cellRenderer({
                  cellData: cellContentRenderer(cellRendererProps),
                  columnIndex: index,
                });
              } else {
                renderer = this.cellRenderer;
              }

              return (
                <Column
                  key={dataKey}
                  headerRenderer={headerProps => this.headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                  })
                  }
                  className={classNames(classes.flexContainer, className)}
                  cellRenderer={renderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellContentRenderer: PropTypes.func,
      dataKey: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,

  onRowClick: PropTypes.func,
  rowClassName: PropTypes.string,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  sort: PropTypes.func,
};

MuiVirtualizedTable.defaultProps = {
  headerHeight: 56,
  rowHeight: 56,
  onRowClick: null,
  rowClassName: null,
  sort: null,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

const stateEnum = [
  'PENDIENTE',
  'PAGADO',
  'PREPARANDO',
  'ENVIADO',
  'RECIBIDO',
  'CANCELADO',
];

const stateForms = [
  OrderShipForm,
  OrderCancelForm,
];

const OrdersTable = ({orders}) => {
  const [state, setState] = useState(false);
  if (!orders) {
    return 'Data not loaded';
  }
  const data = orders.map((order) => {
    const orderState = Math.floor(Math.random() * stateEnum.length);
    return ({
      ...order,
      state: <Chip label={stateEnum[orderState]} style={{backgroundColor: orderState === 5 ? 'red' : 'auto'}} />,
      user: order.user.name,
      article: order.stock.article.name,
      size: order.stock.size,
      createdAt: moment.unix(order.createdAt).format('LLL'),
      update: <IconUpdate onClick={evt => (console.log('JORGE', stateForms[orderState + 3]) || setState(true))} />,
      delete: <IconCancel onClick={evt => console.log('Cancelar pedido', stateForms[orderState]) || setState(true)} />,


    });
  });
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        onRowClick={evt => console.log(evt)}
        columns={[
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

            label: 'Eliminar',
            dataKey: 'delete',
          },
        ]}
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={state}
        onClose={() => (setState(false))}
        >
        <div style={{
          position: 'absolute',
          width: 100,
          backgroundColor: 'white',
          padding: 8,
          outline: 'none',
        }}>
          <OrderShipForm />

        </div>
      </Modal>
    </Paper>
  );
};

export default withGraphQL(ORDERS, ({
  listOrders: orders,
}) => ({
  orders,
}))(OrdersTable);
