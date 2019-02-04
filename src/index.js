// Core
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import createTheme from './styles/createTheme';
import routes from './routes';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import createRoutes from './utils/createRoutes';

const cache = new InMemoryCache();

const GRAPHQL_BASE_URL = 'http://localhost:8080/graphql';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8080/subscriptions',
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_BASE_URL,
  // headers: {
  //   authorization: `Bearer ${
  //     '9d99d6c62c9a5a29279a5dce0d118b939e4e4494'
  //   }`,
  // },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const theme = createTheme();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <App
    client={client}
    routes={createRoutes(routes)()}
    theme={theme} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
