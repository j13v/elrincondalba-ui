import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
      return null;
    },
  });
  window.addEventListener('testPassive', null, opts);
  window.removeEventListener('testPassive', null, opts);
} catch (e) {
  console.info(e);
}

const getPosition = () => ({
  x: document.body.scrollTop,
  y: window.scrollY,
});

const defaultOptions = {
  throttle: 100,
};

export default (options) => {
  const opts = Object.assign({}, defaultOptions, options);

  const [position, setPosition] = useState(getPosition());

  useEffect(() => {
    const handleScroll = () => {
      setPosition(getPosition());
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      supportsPassive ? { passive: true } : false
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
};
