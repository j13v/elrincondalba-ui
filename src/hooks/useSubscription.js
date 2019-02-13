// Credits: https://github.com/Urigo/WhatsApp-Clone-Client-React/blob/master/src/polyfills/react-apollo-hooks.ts
import { DataProxy } from 'apollo-cache';
import { OperationVariables, FetchPolicy } from 'apollo-client';
import { DocumentNode, GraphQLError } from 'graphql';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import * as isEqual from 'react-fast-compare';
import useApollo from './useApollo';


export const useSubscription = (query, options = {}) => {
  const {onSubscriptionData} = options;
  const prevOptions = useRef(null);
  const client = useApollo();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const subscriptionOptions = {
    query,
    variables: options.variables,
    fetchPolicy: options.fetchPolicy,
  };

  useEffect(
    () => {
      prevOptions.current = subscriptionOptions;
      const subscription = client
        .subscribe(subscriptionOptions)
        .subscribe({
          next: ({ data }) => {
            setData(data);

            if (onSubscriptionData) {
              onSubscriptionData({ client, subscriptionData: data });
            }
          },
          error: (err) => {
            setError(err);
            setLoading(false);
          },
          complete: () => {
            setLoading(false);
          },
        });

      return () => {
        subscription.unsubscribe();
      };
    },
    [isEqual(prevOptions.current, subscriptionOptions) ? prevOptions.current : subscriptionOptions],
  );

  return useMemo(
    () => ({
      data,
      error,
      loading,
    }),
    [data, error, loading],
  );
};
