import { NextFunction, Request, Response } from 'express';

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

    res.redirect('/auth/log-in');
  };
}
