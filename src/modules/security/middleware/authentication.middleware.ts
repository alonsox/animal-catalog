import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../../shared/errors/unauthorized-error';

/**
 * Returns a middleware where if the user is not logged in it redirects to the
 * login page.
 */
export function authenticate() {
  return function authenticationMDW(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (req.user) {
      next();
      return;
    }

    next(new UnauthorizedError('You must log in before access to this route'));
  };
}
