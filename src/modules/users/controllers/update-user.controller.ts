import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../shared/errors';
import { getErrorMessages } from '../../shared/utils';
import { routes, userRouteOf } from '../routes/routes.config';
import { updateUser } from '../use-cases/update-user';
import { UserNotFoundError } from '../use-cases/user-not-found-error';
import { UpdateUserErrors } from '../validators/user.validators';
import { renderUpdateUserForm } from './shared.controller';

export async function handleUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: userId } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderUpdateUserForm(res, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      deleteUserUrl: userRouteOf(routes.delete(userId)),
      updateUserUrl: userRouteOf(routes.update(userId)),
      errors: getErrorMessages<UpdateUserErrors>(errors),
    });
    return;
  }

  // UPDATE USER
  try {
    const result = await updateUser({
      userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.newPassword,
    });

    if (result instanceof UserNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    renderUpdateUserForm(res, {
      firstName: result.firstName,
      lastName: result.lastName,
      username: result.username,
      deleteUserUrl: userRouteOf(routes.delete(userId)),
      updateUserUrl: userRouteOf(routes.update(userId)),
    });
  } catch (error: any) {
    next(
      new UnknownError(
        `Error while rendering updating user with ID="${userId}"`,
        error,
      ),
    );
  }
}
