// Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Hooks
import ContentEditable from 'react-sane-contenteditable';
import { makeStyles } from '../../hooks';
// Components
// Styles
import styles from './ContentEditable.styles';


const useStyles = makeStyles(styles);

export default ({
  className,
  editable,
  ...restProps
}) => {
  const classes = useStyles(restProps);
  return (
    <ContentEditable
      editable={editable}
      className={classNames(
        classes.root, {
          [classes.editable]: editable,
        }, className
      )}
      {...restProps}
    />
  );
};
