import {lazy} from 'react';
import {ROUTING_CATALOG} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';

export default () => ({
  exact: true,
  path: ROUTING_CATALOG,
  layout: LayoutMain,
  component: lazy(() => import('./components/CatalogView')),
  menu: 'Catalogo',
});
