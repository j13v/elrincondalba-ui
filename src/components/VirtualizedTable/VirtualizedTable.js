import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


import { withStyles } from '@material-ui/core/styles';

import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import 'moment/locale/es';
import {
  AutoSizer, Column, SortDirection, Table,
} from 'react-virtualized';
import styles from './VirtualizedTable.styles';

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

export default withStyles(styles)(MuiVirtualizedTable);