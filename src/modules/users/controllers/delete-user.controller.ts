import { NextFunction, Request, Response } from 'express';
import { NotFound } from '../../shared/errors';
import { deleteUser } from '../use-cases/delete-user';
import { UserNotFoundError } from '../use-cases/user-not-found-error';

export async function handleDeleteUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Extract ID
  const { id: userId } = req.params;

  // Delete user
  const result = await deleteUser(userId);

  if (result instanceof UserNotFoundError) {
    next(new NotFound(result.message));
    return;
  }

  // All OK
  req.logOut();
  res.redirect('/');
}
