import React, { useState, useEffect } from 'react';
import RoutesContext from './RoutesContext';
import RoutesPropTypes from './RoutesPropTypes';

export const RoutesProvider = ({
  routes = [],
  children,
}) => (
  <RoutesContext.Provider value={routes}>
    {children}
  </RoutesContext.Provider>
);

RoutesProvider.propTypes = RoutesPropTypes;

export default RoutesProvider;
