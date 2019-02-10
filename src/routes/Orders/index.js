import {ROUTING_ORDERS} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';
import OrdersView from './components/OrdersView';

export default () => ({
  exact: true,
  path: ROUTING_ORDERS,
  layout: LayoutMain,
  component: OrdersView,
  menu: 'Pedidos',
  roles: 'manage',
});
