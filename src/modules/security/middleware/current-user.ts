import { Request, Response, NextFunction } from 'express';

/**
 * Returns a middleware function that sets the property 'currentUser' in
 * 'res.locals'.
 *
 * This middleware sets the property in order to give 2 advantages:
 *
 * 1. The templates can test for a user without EJS complaining about the user
 * not being defined.
 *
 * 2. Not having the need to pass the user to every template. In order to do
 * this, the property 'res.locals.currentUser' must be defined when the user
 * logs in.
 */
export function setCurrentUser() {
  return function theMiddlware(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.locals.currentUser = req.user;
    next();
  };
}
