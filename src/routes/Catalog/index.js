import {ROUTING_CATALOG} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';
import CatalogView from './components/CatalogView';

export default () => ({
  exact: true,
  path: ROUTING_CATALOG,
  layout: LayoutMain,
  component: CatalogView,
  menu: 'Catalogo',
});
