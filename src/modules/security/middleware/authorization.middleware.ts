import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../../shared/errors';

export const authorizationErrors = {
  notAuthorized: "You don't have enough permissions",
};

export interface AuthorizationOptions {
  /** `true` to restrict the route access only to an admin user */
  onlyAdmin?: boolean;
}

/**
 * Authorizes a user to do something. If there is no user authenticated it
 * redirects to the login page.
 */
export function authorize(options: AuthorizationOptions) {
  return function authorizationMDW(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.user) {
      res.redirect('/auth/log-in');
      return;
    }

    // TODO: Fix this by typing the request
    if (options.onlyAdmin && !(req.user as any).isAdmin) {
      next(new ForbiddenError(authorizationErrors.notAuthorized));
      return;
    }

    // All OK
    next();
  };
}
