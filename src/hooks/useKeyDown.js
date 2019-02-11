import { useEffect } from 'react';


export default (handler, elem = document) => useEffect(() => {
  elem.addEventListener('keydown', handler, false);
  return () => {
    elem.removeEventListener('keydown', handler, false);
  };
});
