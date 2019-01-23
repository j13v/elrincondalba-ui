// Decorators
import withStyles from '@material-ui/core/styles/withStyles';
// Constants
import {COMPONENT_NAME_PREFIX} from '../constants/component';


export default (style, {name, ...restOptions} = {}) => Comp => withStyles(style, {
  ...restOptions,
  name: `${COMPONENT_NAME_PREFIX}${name || Comp.displayName}`,
})(Comp);
