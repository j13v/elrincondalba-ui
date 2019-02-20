import React, { useState, useEffect } from 'react';
import RouterContext from './RouterContext';
import RouterPropTypes from './RouterPropTypes';

export const RouterProvider = ({
  routes = [],
  children,
}) => (
  <RouterContext.Provider value={routes}>
    {children}
  </RouterContext.Provider>
);

RouterProvider.propTypes = RouterPropTypes;

export default RouterProvider;
