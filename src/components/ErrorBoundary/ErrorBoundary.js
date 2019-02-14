import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import {ErrorBoundary} from 'react-error-boundary';
import Button from '@material-ui/core/Button';
import styles from './ErrorBoundary.styles';


const useStyles = makeStyles(styles);
const useForceUpdate = () => {
  const [errorBoundaryKey, serErrorBoundaryKey] = useState(0);
  return [errorBoundaryKey, () => {
    serErrorBoundaryKey(errorBoundaryKey + 1);
  }];
};

const ErrorFallbackComponent = ({
  componentStack, error, onRestart, ...restProps
}) => {
  const classes = useStyles(restProps);
  return (
    <div className={classes.root}>
      <div className={classes.media} />
      <p><strong>¡Oops! Ha ocurrido un error</strong></p>
      <div className={classes.actions}>
        <Button color="primary" variant="outlined" onClick={onRestart}>Reniciar</Button>
      </div>
      <p>Esto es lo que sabemos…</p>
      <div>
        <strong>Error:</strong>
        <pre style={{
          whiteSpace: 'pre-wrap',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          color: '#343434',
          padding: '0.5em',
        }}>
          {error.toString()}
        </pre>
      </div>
      <div>
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
      </div>
    </div>
  );
};

export const withErrorBoundary = (Component, {
  FallbackComponent = ErrorFallbackComponent,
  onError,
} = {}) => (props) => {
  const [key, forceUpdate] = useForceUpdate();
  return (
    <ErrorBoundary
      key={key}
      FallbackComponent={props => <FallbackComponent onRestart={forceUpdate} {...props} />}
      onError={(...args) => MyErrorHandler(...args) || (onError && onError(...args))}>
      <Component {...props} />
    </ErrorBoundary>
  );
};
