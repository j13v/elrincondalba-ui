import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MuiBreadcrumbs from '@material-ui/lab/Breadcrumbs';
import { Switch, Route, matchPath } from 'react-router';
import Typography from '@material-ui/core/Typography';
import {parseHistoryStack, capitalize} from '../../utils/helpers';
import {useRoutes, useRouter} from '../../hooks';
import Link from '../Link';

export const Breadcrumbs = () => {
  const routes = useRoutes();
  const router = useRouter();
  const [history, setHistory] = useState([]);

  useEffect(() => router.history.listen((location) => {
    if (location) {

      return setHistory([...history, location]);
    }
    console.log('what?', location);
    return null;
  }));

  // useEffect(() => {
  //   setHistory([]);
  //   console.log('reset');
  // }, [router.location.pathname.split(/\//).length === 2]);
  // // console.log(router.location.pathname.split(/\//).length);

  // const route = routes.find(route => matchPath(window.location.pathname, route));
  const historyFilteredStack = parseHistoryStack(history.concat([router.location]));
  return (
    <MuiBreadcrumbs arial-label="Breadcrumb">
      <Link color="inherit" to="/">
        Home
      </Link>
      {
        historyFilteredStack.map(({pathname}, idx) => {
          if (pathname === '/') return null;
          const previous = pathname.split(/\/+/ig).slice(-1)[0];
          return (
            <Link key={idx} to={pathname}>
              {capitalize(previous)}
            </Link>);
        })
      }
      {/* <Link color="primary" to={router.location.pathname}>
        {capitalize(router.location.pathname.split(/\/+/ig).slice(-1)[0])}
      </Link> */}
    </MuiBreadcrumbs>
  );
};

// route
//         && route.menu ? (
//           <Link color="primary" to="/categorias">
//             {capitalize(route.menu)}
//           </Link>
//           ) : router.location.pathname.split(/\/+/ig).slice(1).map((chunk, idx, {length}) => (
//             <Link key={idx} color={idx === length - 1 ? 'primary' : 'inherit'} to="/categorias">
//               {capitalize(urlFormat(chunk, router.match.params))}
//             </Link>
//           ))}

export default Breadcrumbs;
