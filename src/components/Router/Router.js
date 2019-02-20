import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, matchPath } from 'react-router';
import SwitchAnimated from '../SwitchAnimated';
import {useAuthz} from '../../hooks';
import RouterProvider from './RouterProvider';
import RouterPropTypes from './RouterPropTypes';

const groupBy = function (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const groupByLayout = function (xs) {
  return groupBy(xs, 'layout');
};

export const RouterLayout = ({routes, children, location}) => {
  const what = Object
    .values(groupByLayout(routes))
    .find(routes => routes
      .some(route => !!matchPath(window.location.pathname, route)))[0] || {};
  const Layout = what.layout || what.component || what.children;
  return <Layout>{children}</Layout>;
};

export const Router = ({routes, layout, ...restProps}) => {
  // console.log(RouterLayout())
  const authz = useAuthz();
  return (
    <RouterProvider routes={{
      routes: routes.filter(({roles}) => !roles || authz.can(roles)),
    }}>
      <BrowserRouter>
        <RouterLayout routes={routes}>
          <SwitchAnimated>
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
                    <Component location={location} match={match} params={match.params} />
                  ) : 'Unauthorized'
                )}
                path={path}
                {...restRouteProps} />
            )))}
          </SwitchAnimated>
        </RouterLayout>
      </BrowserRouter>
    </RouterProvider>
  );
};

Router.propTypes = {
  ...RouterPropTypes,
};

Router.defaultProps = {
  layout: ({children}) => <div>{children}</div>,
};

export default Router;
