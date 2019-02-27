import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, matchPath } from 'react-router';
import SwitchAnimated from '../SwitchAnimated';
import {useAuthz} from '../../hooks';
import RoutesProvider from './RoutesProvider';
import RoutesPropTypes from './RoutesPropTypes';

const groupBy = function (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

const groupByLayout = function (xs) {
  return groupBy(xs, 'layout');
};

export const RoutesLayout = ({routes, children, location}) => {
  const what = Object
    .values(groupByLayout(routes))
    .find(routes => routes
      .some(route => !!matchPath(window.location.pathname, route)))[0] || {};
  const Layout = what.layout || what.component || what.children;
  return <Layout>{children}</Layout>;
};

export const Routes = ({routes, layout, ...restProps}) => {
  // console.log(RoutesLayout())
  const authz = useAuthz();
  return (
    <RoutesProvider routes={routes.filter(({roles}) => !roles || authz.can(roles))}>
      <BrowserRouter>
        <RoutesLayout routes={routes}>
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
        </RoutesLayout>
      </BrowserRouter>
    </RoutesProvider>
  );
};

Routes.propTypes = {
  ...RoutesPropTypes,
};

Routes.defaultProps = {
  layout: ({children}) => <div>{children}</div>,
};

export default Routes;
