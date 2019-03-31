import React, { Suspense as ReactSuspense } from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from '../ErrorBoundary';


export const Suspense = props => (<ReactSuspense {...props} />);

Suspense.propTypes = {
  fallback: PropTypes.node,
  delayMs: PropTypes.number,
};

Suspense.defaultProps = {
  fallback: (<div>Loading</div>),
  delayMs: 1500,
};

export const withSuspense = (Component, opts) => {
  Component = withErrorBoundary(Component);
  return ({
    fallback,
    ...restProps
  }) => (
    <Suspense
      {...opts}>
      <Component suspend {...restProps} />
    </Suspense>
  );

};

export default withErrorBoundary(Suspense);
