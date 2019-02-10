import React from 'react';
import PropTypes from 'prop-types';
import AuthorizationContext from './AuthorizationContext';

export const AuthorizationProvider = ({authz, children}) => (
  <AuthorizationContext.Provider value={authz}>
    {children}
  </AuthorizationContext.Provider>);

AuthorizationProvider.propTypes = {

};

export default AuthorizationProvider;
