import {ROUTING_HOME} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';
import HomeView from './components/HomeView';

export default () => ({
  path: ROUTING_HOME,
  layout: LayoutMain,
  component: HomeView,
});
