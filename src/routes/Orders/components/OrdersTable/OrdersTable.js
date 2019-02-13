import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
import {withGraphQL} from '@global/utils/relay';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import 'moment/locale/es';
import {
  AutoSizer, Column, SortDirection, Table,
} from 'react-virtualized';

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

const data = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

let id = 0;
function createData(dessert, calories, fat, carbs, protein) {
  id += 1;
  return {
    id, dessert, calories, fat, carbs, protein,
  };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = data[Math.floor(Math.random() * data.length)];
  rows.push(createData(...randomSelection));
}
const stateEnum = [
  'PENDIENTE',
  'PAGADO',
  'PREPARANDO',
  'ENVIADO',
  'RECIBIDO',
  'CANCELADO',
];


function OrdersTable({orders}) {
  if (!orders) {
    return 'Data not loaded';
  }
  const data = orders.map(order => ({
    ...order,
    state: <Chip label={stateEnum[order.state]} style={{backgroundColor: order.state === 5 ? 'red' : 'auto'}} />,
    user: order.user.name,
    article: order.stock.article.name,
    size: order.stock.size,
    createdAt: moment.unix(order.createdAt).format('LLL'),
  }));
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      <WrappedVirtualizedTable
        rowCount={data.length}
        rowGetter={({ index }) => data[index]}
        onRowClick={event => console.log(event)}
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
        ]}
      />
    </Paper>
  );
}

export default withGraphQL(ORDERS, ({
  listOrders: orders,
}) => ({
  orders,
}))(OrdersTable);
