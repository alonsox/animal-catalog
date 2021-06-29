import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../../shared/errors';

export const authorizationErrors = {
  notAuthorized: "You don't have enough permissions",
};

export interface AuthorizationOptions {
  /** `true` to restrict the route access only to an admin user */
  onlyAdmin?: boolean;

  /** `true` so only the user itself can access that route */
  onlyOwnUser?: boolean;
}

/**
 * Authorizes a user to do something. If there is no user authenticated it
 * fails with a forbidden error.
 */
export function authorize(options: AuthorizationOptions) {
  return function authorizationMDW(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (!req.user) {
      next(new ForbiddenError(authorizationErrors.notAuthorized));
      return;
    }

    if (options.onlyOwnUser && req.params?.id !== (req.user as any).id) {
      next(new ForbiddenError(authorizationErrors.notAuthorized));
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
