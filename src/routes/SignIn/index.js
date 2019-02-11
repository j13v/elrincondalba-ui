import {ROUTING_SIGN_IN} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';
import SignInView from './components/SignInView';

export default () => ({
  exact: true,
  path: ROUTING_SIGN_IN,
  component: SignInView,
});
