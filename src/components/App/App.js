// Core
import React from 'react';
import PropTypes from 'prop-types';
// Providers
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
// Components
import { Switch, Route } from 'react-router';


export const App = ({
  theme,
  client,
  routes,
  layout, ...rest
}) => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                <Layout {...restProps}>
                  <Component location={location} match={match} params={match.params} />
                </Layout>
              )}
              path={path}
              {...restProps} />
          )))}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
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
