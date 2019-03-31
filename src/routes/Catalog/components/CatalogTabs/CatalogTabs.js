import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconShoppingCart from '@material-ui/icons/ShoppingCart';
import IconFavorite from '@material-ui/icons/Favorite';
import IconFiberNew from '@material-ui/icons/FiberNew';
import styles from './CatalogTabs.style';


const useStyles = makeStyles(styles);

export const CatalogTabs = ({
  className,
  ...restProps
}) => {
  const [value, setValue] = React.useState(2);
  const classes = useStyles(restProps);

  function handleChange(event, newValue) {
    setValue(newValue);
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
      <Tab
        classes={tabClasess}
        label="Lo más popular"
        alt="Articulos ordenados por mejor valorados"
        icon={<IconFavorite />} />
      <Tab
        classes={tabClasess}
        label="Lo más solicitado"
        alt="Articulos ordenados por mayor numero de solicitudes"
        icon={<IconShoppingCart />} />
      <Tab
        classes={tabClasess}
        label="Lo más nuevo"
        alt="Articulos ordenados por fecha de inclusion"
        icon={<IconFiberNew />} />
    </Tabs>
  );
};

export default CatalogTabs;
