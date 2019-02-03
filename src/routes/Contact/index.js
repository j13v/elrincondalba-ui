import {ROUTING_CONTACT} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';

export default () => ({
  exact: true,
  path: ROUTING_CONTACT,
  layout: LayoutMain,
  component: () => 'TODO',
  menu: 'Contacto',
});
