import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { UnknownError } from '../../../shared/errors';
import { sendPasswordResetEmail } from '../../use-cases/pwd-reset/send-pwd-reset-email';

export function showSendPwdResetEmailForm(req: Request, res: Response) {
  renderPwdResetEmailForm(res, {});
}

export async function handleSendPasswordResetEmail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email } = req.body;

  // Validate Email
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderPwdResetEmailForm(res, {
      email,
      errorMsg: errors.array()[0].msg,
    });
    return;
  }

  try {
    await sendPasswordResetEmail(email);

    renderEmailSent(res, { email });
  } catch (err) {
    next(
      new UnknownError(
        `Something failed while sending password reset email to user with email ${email}`,
      ),
    );
  }
}

function renderPwdResetEmailForm(res: Response, data: any = {}) {
  res.render('users/pwd-reset/pwd-reset', {
    title: 'Animal Catalog | Password Reset',
    email: data.email || '',
    errorMsg: data.errorMsg || '',
  });
}

function renderEmailSent(res: Response, data: any = {}) {
  res.render('users/pwd-reset/pwd-reset-sent', {
    title: 'Animal Catalog | Password Reset',
    email: data.email || 'No email provided',
  });
}
