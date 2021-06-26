/** Base path to mount all the animals routes */
export const animalsMountPoint = '/catalog';

/** Routes for the categories (not including base path) */
export const categoryRoutes = {
  create: () => '/categories/new',

  getAll: () => '/categories',

  /** If no parameters, it computes the route for the router. */
  getSingle: (id?: string) => `/categories/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  update: (id?: string) => `/categories/update/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  delete: (id?: string) => `/categories/delete/${id || ':id'}`,
};

export const fullRouteOf = makeFullRoute(animalsMountPoint);

function makeFullRoute(basePath: string) {
  return function aux(path: string) {
    return `${basePath}${path}`;
  };
}
