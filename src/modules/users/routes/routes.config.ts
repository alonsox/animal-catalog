/** Base path to mount all the animals routes */
export const usersMountPoint = '/users';

/** Routes for the classes (not including base path) */
export const routes = {
  signUp: () => '/sign-up',

  confirmAccount: (cc?: string) => `/sign-up/${cc || ':confirmationCode'}`,

  /** If no parameters, it computes the route for the router. */
  getDetails: (id?: string) => `/my-account/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  update: (id?: string) => `/my-account/update/${id || ':id'}`,

  /** If no parameters, it computes the route for the router. */
  delete: (id?: string) => `/my-account/delete/${id || ':id'}`,
};

export const userRouteOf = makeFullRoute(usersMountPoint);

function makeFullRoute(basePath: string) {
  return function aux(path: string) {
    return `${basePath}${path}`;
  };
}
