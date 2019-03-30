import {useState} from 'react';
import qs from 'qs';

const noop = _ => _;

const useForceUpdate = () => {
  const [s, setState] = useState(0);
  return () => setState(!s);
};

const swapMap = objMap => Object.keys(objMap).reduce((prev, key) => ({...prev, [objMap[key]]: key }), {});

const objectMapValues = (obj, keys = {}, serialize = noop) => Object
  .entries(obj)
  .reduce((prev, [key, val]) => ({
    ...prev,
    [keys ? (keys[key] || key) : key]: serialize(val, keys[key] || key),
  }), {});

const setState = (update, keys, stringify) => (state) => {
  const serialized = qs.stringify(objectMapValues(state, keys, stringify), {
    arrayFormat: 'comma',
    encode: false,
  });
  const url = new URL(window.location);
  if (url.search.substr(1) !== serialized) {
    url.search = serialized;
    window.history.replaceState({ state }, '', url.toString());
    update();
  }
};

const getState = (defaultState, keys, parse) => ({
  ...defaultState,
  ...objectMapValues(qs.parse(window.location.search, {
    parseArrays: false,
    ignoreQueryPrefix: true,
  }), keys, (v, k) => parse(Array.isArray(v) ? v.join(',') : v, k)),
});

export default (defaultState, opts = {}) => {
  const forceUpdate = useForceUpdate();
  let swappedKeys;

  const {
    keys,
    parse = noop,
    stringify = noop,
  } = opts;

  if (keys) {
    swappedKeys = swapMap(keys);
  }

  return [
    getState(defaultState, swappedKeys, parse),
    setState(forceUpdate, keys, stringify)];

};
