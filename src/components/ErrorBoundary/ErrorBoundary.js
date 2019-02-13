import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {ErrorBoundary} from 'react-error-boundary';
import styles from './ErrorBoundary.styles';


const useStyles = makeStyles(styles);

const MyFallbackComponent = ({ componentStack, error, ...restProps}) => {
  const classes = useStyles(restProps);
  return (
    <div className={classes.root}>
      <div className={classes.media} />
      <p><strong>¡Oops! Ha ocurrido un error</strong></p>
      <p>Esto es lo que sabemos…</p>
      <p>
        <strong>Error:</strong>
        <pre style={{
          whiteSpace: 'pre-wrap',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: '#343434',
          padding: '0.5em',
        }}>
          {error.toString()}
        </pre>
      </p>
      <p>
        <strong>Stacktrace:</strong>
        <pre style={{
          whiteSpace: 'no-wrap',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: '#343434',
          overflow: 'scroll',
          padding: '0.5em',
        }}>
          {componentStack.replace(/^\s+/gm, '')}
        </pre>
      </p>
    </div>
  );
};

const MyErrorHandler = () => {

};

export const withErrorBoundary = (Component, {FallbackComponent, onError} = {}) => props => (
  <ErrorBoundary
    FallbackComponent={FallbackComponent || MyFallbackComponent}
    onError={(...args) => MyErrorHandler(...args) || (onError && onError(...args))}>
    <Component {...props} />
  </ErrorBoundary>
);
