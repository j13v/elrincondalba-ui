import {lazy} from 'react';
import {ROUTING_SIGN_IN} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';


export default () => ({
  exact: true,
  path: ROUTING_SIGN_IN,
  component: lazy(() => import('./components/SignInView')),
  roles: 'manage',
});
