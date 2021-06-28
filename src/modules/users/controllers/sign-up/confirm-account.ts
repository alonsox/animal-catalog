import { Request, Response } from 'express';
import { confirmAccount } from '../../use-cases/create-user';

export async function checkAccountConfirmation(req: Request, res: Response) {
  const { confirmationCode } = req.params;

  if (!confirmationCode) {
    renderConfirmationError(res);
    return;
  }

  try {
    const result = await confirmAccount(confirmationCode);

    const { wasAlreadyActive, user } = result;
    renderConfirmationSuccess(res, {
      name: user.firstName,
      wasAlreadyActive,
    });
  } catch (err) {
    renderConfirmationError(res);
  }
}

interface ConfirmationSuccessTemplate {
  name: string;
  wasAlreadyActive: boolean;
}

function renderConfirmationSuccess(
  res: Response,
  data: ConfirmationSuccessTemplate,
) {
  res.render('users/sign-up/account-confirmation-success', {
    title: 'Congratulations',
    name: data.name || 'No name provided',
    wasAlreadyActive: data.wasAlreadyActive || false,
  });
}

function renderConfirmationError(res: Response) {
  res.render('users/sign-up/account-confirmation-error', {
    title: 'Account Confirmation Error',
  });
}
