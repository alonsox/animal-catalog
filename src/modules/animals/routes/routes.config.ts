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

/** Routes for the families (not including base path) */
export const familyRoutes = {
  create: () => '/families/new',

  getAll: () => '/families',

  /** If no parameters, it computes the route for the router. */
  getDetails: (id?: string) => `/families/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  update: (id?: string) => `/families/update/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  delete: (id?: string) => `/families/delete/${id || ':id'}`,
};

export const fullRouteOf = makeFullRoute(catalogMountPoint);

function makeFullRoute(basePath: string) {
  return function aux(path: string) {
    return `${basePath}${path}`;
  };
}
