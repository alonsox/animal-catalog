import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound, UnknownError } from '../../shared/errors';
import { getErrorMessages } from '../../shared/utils';
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
      updatePostUrl: `/users/my-account/update/${userId}`, // TODO: Fix this url
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
      updatePostUrl: `/users/my-account/update/${userId}`, // TODO: Fix this url
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
