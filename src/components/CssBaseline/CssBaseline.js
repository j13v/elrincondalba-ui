/* eslint-disable react/no-unused-prop-types */
// Core
import React from 'react';
import PropTypes from 'prop-types';
// Decorators
import withStyles from '../../styles/withStyles';
// Styles
import styles from './CssBaseline.style';


/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
class CssBaseline extends React.Component {
  render() {
    const {children} = this.props;
    return children;
  }
}

CssBaseline.propTypes = {
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,
};

CssBaseline.defaultProps = {
  children: null,
};

export default withStyles(styles, {
  name: 'CssBaseline',
})(CssBaseline);
