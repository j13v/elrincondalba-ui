export default routes => (...args) => routes.map(route => (typeof route === 'function' ? route(...args) : route));
