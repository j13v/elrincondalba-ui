import qs from 'qs';

const setState = (state) => {
  const serialized = qs.stringify(defaultState);
  const url = new URL(window.location);
  if (url.search.substr(1) !== serialized) {
    url.search = serialized;
    window.history.replaceState({ state }, '', url.toString());
  }
};

export default (defaultState, options) => {
  const state = Object
    .entries(qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    }))
    .reduce((prev, [key, val]) => ({
      ...prev,
      [key]: val && val.indexOf(',') > -1 ? val.split(/,/) : val,
    }), {});
  return [state, setState];

};
