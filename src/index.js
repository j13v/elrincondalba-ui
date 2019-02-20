// Core
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { split, concat } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AbilityBuilder } from '@casl/ability';
import createTheme from './styles/createTheme';
import routes from './routes';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import createRoutes from './utils/createRoutes';


const cache = new InMemoryCache();
const isSecure = /https:/.test(global.location.protocol);
const API_DOMAIN = global.__REACT_APP_API_DOMAIN__ || global.location.host;
const GRAPHQL_BASE_URL = `${isSecure ? 'https' : 'http'}://${API_DOMAIN}/graphql`;

const wsLink = new WebSocketLink({
  uri: `${isSecure ? 'wss' : 'ws'}://${API_DOMAIN}/graphql`,
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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const uploadLink = createUploadLink({
  uri: GRAPHQL_BASE_URL,
});

const localLink = withClientState({
  cache,
  defaults: {
    isConnected: true,
  },
  resolvers: {
    Mutation: {
      updateNetworkStatus: (_, { isConnected }, { cache }) => {
        cache.writeData({ data: { isConnected }});
        return null;
      },
    },
  },
  // typeDefs: `
  //   type CatalogFilters {
  //     sortBy: String
  //     categories: [String]
  //     priceRange: [Integer]
  //   }
  //   type Query {
  //     catalogFilters: CatalogFilters
  //   }
  //   type Mutation {
  //     updateCatalogFilters(catalogFilters: CatalogFilter!)
  //   }
  // `,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(localLink.concat(uploadLink))
);

const theme = createTheme();


const defineAbilitiesFor = user => AbilityBuilder.define((allow, forbid) => {
  if (user.admin) {
    allow('manage', 'all');
  } else {
    allow('read', 'all');
  }
});


const client = new ApolloClient({
  link,
  cache,
});

const authz = {
  apply: defineAbilitiesFor,
  resolver: (cb = a => a) => {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    if (accessToken) {
      cb(require('jwt-decode')(localStorage.getItem('token')));
    }
  },
};

ReactDOM.render(
  <App
    client={client}
    authz={authz}
    routes={createRoutes(routes)()}
    theme={theme} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
