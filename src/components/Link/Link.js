import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import {Link as RouterLink} from 'react-router-dom';
import {urlFormat, capitalize} from '../../utils/helpers';
import styles from './Link.style';


const useStyles = makeStyles(styles);

export const Link = ({
  className,
  params,
  color,
  to,
  ...restProps
}) => {
  const classes = useStyles(restProps);

  return (
    <RouterLink
      className={classNames(
        classes.root,
        classes[`color${capitalize(color)}`],
        className
      )}
      to={params ? urlFormat(to, params) : to}
      {...restProps} />
  );
};

Link.propTypes = {
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),
};

Link.defaultProps = {
  color: 'inherit',
};

export default Link;
