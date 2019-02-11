import {ROUTING_ARTICLE} from '../../constants/routing';
import LayoutMain from '../../layouts/LayoutMain';
import ArticleView from './components/ArticleView';

export default () => ({
  path: ROUTING_ARTICLE,
  layout: LayoutMain,
  component: ArticleView,
});
