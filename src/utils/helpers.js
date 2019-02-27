export { capitalize } from '@material-ui/core/utils/helpers';

export const urlFormat = (url, params = {}) => url.replace(/:([a-z_0-9]+)/ig, (match, paramName) => params[paramName]);

export const parseHistoryStack = stack => stack
  .reverse()
  .filter((item, idx, arr) => {
    for (let i = idx; i--;) {
      if (item.pathname.replace(/\/$/, '').indexOf(arr[i].pathname.replace(/\/$/g, '')) !== -1) return false;
      if (item.pathname.split(/\//).length > arr[i].pathname.split(/\//).length) return false;
    }
    return true;
  }).reverse();
