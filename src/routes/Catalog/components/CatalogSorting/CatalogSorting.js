import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconShoppingCart from '@material-ui/icons/ShoppingCart';
import IconFavorite from '@material-ui/icons/Favorite';
import IconFiberNew from '@material-ui/icons/FiberNew';
import styles from './CatalogSorting.style';


const useStyles = makeStyles(styles);

export const CatalogSorting = ({
  className,
  onChange,
  criterias,
  ...restProps
}) => {
  const [value, setValue] = React.useState(2);
  const classes = useStyles(restProps);

  function handleChange(event, newValue) {
    setValue(newValue);
    if (onChange) {
      onChange(event, criterias[newValue]);
    }
  }

  const tabClasess = {
    wrapper: classes.tabWrapper,
    // labelContainer: classes.tabLabelContainer,
  };

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
      onChange={handleChange}
      {...restProps}
      className={classNames(classes.root, className)}>
      {criterias.map((criteria, key) => (
        <Tab
          key={key}
          classes={tabClasess}
          {...criteria} />
      ))}
    </Tabs>
  );
};

CatalogSorting.propTypes = {
  criterias: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
  })),
  onChange: PropTypes.func,
};

CatalogSorting.defaultProps = {
  criterias: [{
    label: 'Lo más popular',
    alt: 'Articulos ordenados por mejor valorados',
    name: 'POPULAR',
    icon: <IconFavorite />,
  }, {
    label: 'Lo más solicitado',
    alt: 'Articulos ordenados por mayor numero de solicitudes',
    name: 'PURCHASES',
    icon: <IconShoppingCart />,
  }, {
    label: 'Lo más nuevo',
    alt: 'Articulos ordenados por fecha de inclusion',
    name: 'RECENTS',
    icon: <IconFiberNew />,
  }],
  onChange: undefined,
};

export default CatalogSorting;
