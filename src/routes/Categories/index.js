import {ROUTING_CATEGORIES} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';

export default () => ({
  exact: true,
  path: ROUTING_CATEGORIES,
  layout: LayoutMain,
  component: () => 'TODO',
  menu: 'Categorias',
});
