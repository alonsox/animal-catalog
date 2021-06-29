/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  ForbiddenError,
  InternalServerError,
  NotFound,
} from '../shared/errors';
import { UnauthorizedError } from '../shared/errors/unauthorized-error';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Default handler only for development
  if (req.app.get('env') === 'development') {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log('ERROR: ', err);
  }

  // HANDLE NORMAL ERRORS
  if (err instanceof UnauthorizedError) {
    console.log(`UNAUTHORIZED: ${err.message}`);
    res.status(err.status).redirect('/auth/log-in');
    return;
  }

  if (err instanceof ForbiddenError) {
    console.log(`FORBIDDEN ERROR: ${err.message}`);
    res
      .status(err.status)
      .render('errors/403-forbidden', { title: '403 Forbidden' });
    return;
  }

  if (err instanceof NotFound) {
    console.log(`NOT FOUND ERROR: ${err.message}`);
    res
      .status(err.status)
      .render('errors/404-not-found', { title: '404 Not Found' });
    return;
  }

  // Any other error
  console.log(`INTERNAL SERVER ERROR: ${err.message}`, {
    title: 'Internal Server Error',
  });
  console.log(err);
  res.status(500).render('errors/500-server-error');
}
