import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../shared/errors';
import { userRouteOf, routes } from '../routes/routes.config';
import { getUser } from '../use-cases/get-user-details';
import { UserNotFoundError } from '../use-cases/user-not-found-error';
import { UpdateUserErrors } from '../validators/user.validators';

export async function showMyAccountDetailsForm(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: userId } = req.params;

  try {
    const result = await getUser(userId);

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
        `Error while rendering update user form for user with ID="${userId}"`,
        error,
      ),
    );
  }
}

interface UpdateUserTemplate {
  firstName: string;
  lastName: string;
  username: string;
  updateUserUrl: string;
  deleteUserUrl: string;
  errors?: UpdateUserErrors;
}

export function renderUpdateUserForm(res: Response, data: UpdateUserTemplate) {
  res.render('users/my-account-form', {
    title: 'Animal Catalog | Update User',
    ...data,
    errors: data.errors || {},
  });
}
