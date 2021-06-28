import { NextFunction, Request, Response } from 'express';
import { NotFound, UnknownError } from '../../shared/errors';
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
      updatePostUrl: `/users/my-account/update/${userId}`, // TODO: Fix this url
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
  updatePostUrl: string;
  errors?: UpdateUserErrors;
}

export function renderUpdateUserForm(res: Response, data: UpdateUserTemplate) {
  res.render('users/my-account-form', {
    title: 'Animal Catalog | Update User',
    ...data,
    errors: data.errors || {},
  });
}
