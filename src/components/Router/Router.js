import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import {useAuthz} from '../../hooks';
import RouterContext from './RouterContext';
import RouterPropTypes from './RouterPropTypes';

export const Router = ({routes, layout, ...restProps}) => {
  const authz = useAuthz();
  return (
    <RouterContext.Provider value={{
      routes: routes.filter(({roles}) => !roles || authz.can(roles)),
    }}>
      <BrowserRouter>
        <Switch>
          {routes.map(({
            component: Component,
            layout: Layout = layout,
            path,
            roles,
            ...restRouteProps
          }, key) => (Array.isArray(path) ? path : [path]).map(path => (
            <Route
              key={key}
              component={({match, location}) => (
                !roles || authz.can(roles) ? (
                  <Layout routes={routes} {...restProps} {...restRouteProps}>
                    <Component location={location} match={match} params={match.params} />
                  </Layout>
                ) : 'Unauthorized'
              )}
              path={path}
              {...restRouteProps} />
          )))}
        </Switch>
      </BrowserRouter>
    </RouterContext.Provider>
  );
};

Router.propTypes = RouterPropTypes;

Router.defaultProps = {
  layout: ({children}) => <div>{children}</div>,
};

export default Router;
