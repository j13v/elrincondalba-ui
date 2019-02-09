import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import styles from './LoadableImage.style';


const useStyles = makeStyles(styles);

export const LoadableImage = ({
  children,
  style,
  className,
  placeholder = 'https://picsum.photos/45/78',
  image = 'https://picsum.photos/182/314',
  ...restProps
}) => {
  let cancelled = false;
  const classes = useStyles(restProps);
  const [loadState, setLoadState] = useState({
    src: placeholder,
    loaded: false,
  });

  useEffect(() => {
    const img = new Image();
    cancelled = false;
    img.onload = () => {
      if (!cancelled) {
        setLoadState({
          src: img.src,
          loaded: true,
        });
      }
      return () => {
        cancelled = true;
      };
    };
    img.src = image;
  }, [image]);

  return (
    <div
      style={{backgroundImage: `url("${loadState.src}")`, ...style}}
      className={classNames(classes.root, {[!classes.loaded]: loadState.loading}, className)}
      {...restProps}>
      {children}
    </div>
  );
};


LoadableImage.propTypes = {
  image: PropTypes.string,
  placeholder: PropTypes.string,
};

LoadableImage.defaultProps = {
  image: undefined,
  placeholder: undefined,
};

export default LoadableImage;
