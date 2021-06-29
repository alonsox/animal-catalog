import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { NotFound } from '../../../shared/errors';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { UserDto } from '../../dto/user-dto';
import { getUser } from '../../use-cases/get-user-details';
import { resetPassword } from '../../use-cases/pwd-reset/reset-password';
import { verifySecurityCode } from '../../use-cases/pwd-reset/security-code';
import { UserNotFoundError } from '../../use-cases/user-not-found-error';

export async function showPasswordResetForm(req: Request, res: Response) {
  try {
    const { userId, securityCode } = req.params;

    const result = await verifySecurityCode(userId, securityCode);

    if (result instanceof Error) {
      renderPwdResetError(res);
      return;
    }

    renderPwdResetForm(res);
  } catch (err) {
    renderPwdResetError(res);
  }
}

export async function handlePasswordReset(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderPwdResetForm(res, {
      newPassword: '',
      newPwdConfirmation: '',
      errorMsg: errors.array()[0].msg,
    });
    return;
  }

  // Extract info
  const { userId, securityCode } = req.params;
  const { newPassword } = req.body;

  try {
    // All ok, change password
    const result = await resetPassword(userId, securityCode, newPassword);

    if (result instanceof UserNotFoundError) {
      next(new NotFound(result.message));
      return;
    }

    if (result instanceof Error) {
      renderPwdResetError(res);
      return;
    }

    // OK
    const user = (await getUser(userId)) as UserDto;
    renderPwdResetSuccess(res, { name: capitalizeAll(user.firstName) });
  } catch (err) {
    renderPwdResetError(res);
  }
}

function renderPwdResetForm(res: Response, data: any = {}) {
  res.render('users/pwd-reset/pwd-reset-form', {
    title: 'Password Reset',
    newPassword: data.newPassword || '',
    newPwdConfirmation: '',
    errorMsg: data.errorMsg || '',
  });
}

function renderPwdResetSuccess(res: Response, data: any) {
  res.render('users/pwd-reset/pwd-reset-success', {
    title: 'Password Reset Success',
    name: data.name,
  });
}

function renderPwdResetError(res: Response) {
  res.render('users/pwd-reset/pwd-reset-error', {
    title: 'Password Reset Failed',
  });
}
