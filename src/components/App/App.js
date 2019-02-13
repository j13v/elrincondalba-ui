// Core
import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
// Providers
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { ThemeProvider } from '@material-ui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { AuthorizationProvider } from '../Authorization';
import Router from '../Router';
// Components
import CssBaseline from '../CssBaseline';


export const App = ({
  theme,
  client,
  routes,
  layout,
  authz,
  ...rest
}) => (
  <AuthorizationProvider authz={authz}>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<div>Loading...</div>}>
              <Router routes={routes} />
            </Suspense>
          </MuiThemeProvider>
        </ThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  </AuthorizationProvider>
);

App.propTypes = {
  theme: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

App.defaultProps = {
  layout: ({children}) => (<div>{children}</div>),
};

export default App;
