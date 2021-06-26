/** Base path to mount all the animals routes */
export const catalogMountPoint = '/catalog';

/** Routes for the classes (not including base path) */
export const classRoutes = {
  create: () => '/classes/new',

  getAll: () => '/classes',

  /** If no parameters, it computes the route for the router. */
  getDetails: (id?: string) => `/classes/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  update: (id?: string) => `/classes/update/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  delete: (id?: string) => `/classes/delete/${id || ':id'}`,
};

export const fullRouteOf = makeFullRoute(catalogMountPoint);

function makeFullRoute(basePath: string) {
  return function aux(path: string) {
    return `${basePath}${path}`;
  };
}
