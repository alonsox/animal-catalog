/** Base path to mount all the animals routes */
export const animalsMountPoint = '/catalog';

/** Routes for the categories (not including base path) */
export const categoryRoutes = {
  create: '/categories/new',
  update: '/categories/update/:id',
  delete: '/categories/delete/:id',
  getAll: '/categories',
  getSingle: '/categories/:id',
};

/** Computes the full route inside the animals module */
export const fullRouteOf = fullRoute(animalsMountPoint);

function fullRoute(mounthPoint: string) {
  return function calculateRoute(route: string) {
    return mounthPoint + route;
  };
}
