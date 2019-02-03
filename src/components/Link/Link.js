import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import styles from './Link.style';


const useStyles = makeStyles(styles);

export default ({
  className,
  classes,
  ...restProps
}) => {
  const cls = useStyles({classes});
  return <Link className={classNames(cls.root, className)} {...restProps} />;
};
