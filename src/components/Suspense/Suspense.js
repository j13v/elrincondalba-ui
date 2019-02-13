import React, {Suspense as ReactSuspense} from 'react';
import PropTypes from 'prop-types';

export const Suspense = props => (<ReactSuspense {...props} />);

Suspense.propTypes = {
  fallback: PropTypes.node,
};

Suspense.defaultProps = {
  fallback: (<div>Loading</div>),
};

export default Suspense;
