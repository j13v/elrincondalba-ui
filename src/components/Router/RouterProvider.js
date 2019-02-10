import React, { useState, useEffect } from 'react';
import RouterContext from './RouterContext';


export const RouterProvider = ({
  routes,
  children,
}) => (
  <RouterContext.Provider value={routes}>
    {children}
  </RouterContext.Provider>
);

RouterProvider.propTypes = RouterPropTypes;

export default RouterProvider;
