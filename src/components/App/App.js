// Core
import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
// Providers
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { AuthorizationProvider } from '../Authorization';
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Switch>
              {routes.map(({
                component: Component,
                layout: Layout = layout,
                path,
                ...restProps
              }, key) => (Array.isArray(path) ? path : [path]).map(path => (
                <Route
                  exact
                  key={key}
                  component={({match, location}) => (
                    <Layout routes={routes} {...restProps}>
                      <Component location={location} match={match} params={match.params} />
                    </Layout>
                  )}
                  path={path}
                  {...restProps} />
              )))}
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ThemeProvider>
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
