import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthorizationContext from './AuthorizationContext';


export const AuthorizationProvider = ({authz, children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authz.resolver().then((user) => {
      setUser(user);
      return () => {
        console.log('pepe');
      };
    });
  });

  return (
    <AuthorizationContext.Provider value={user ? authz.apply(user) : {can: () => false}}>
      {children}
    </AuthorizationContext.Provider>
  );
};

AuthorizationProvider.propTypes = {
  authz: PropTypes.shape({
    resolver: PropTypes.func.isRequired,
    apply: PropTypes.func.isRequired,
  }).isRequired,
};

export default AuthorizationProvider;
