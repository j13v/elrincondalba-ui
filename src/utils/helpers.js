export const urlFormat = (url, params = {}) => url.replace(/:([a-z_0-9]+)/ig, (match, paramName) => params[paramName]);
