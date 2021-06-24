import { Request, Response } from 'express';
import { createUser } from '../../use-cases/create-user';

export function showSignUpForm(req: Request, res: Response) {
  if (req.user) {
    res.redirect('/');
    return;
  }

  renderSignUpForm(res);
}

export async function createNewAccount(
  req: Request,
  res: Response,
  // next: NextFunction,
) {
  if (req.user) {
    res.redirect('/');
    return;
  }

  // CREATE USER
  const newUser = await createUser(req.body);

  // Send to page of confirmation
  showConfirmationPending(res, {
    name: newUser.firstName,
    email: newUser.email,
  });
}

// interface DatosNuevaCuenta {
//   title: string;
//   lastName: string;
//   email: string;
//   username: string;
//   errors: object;
// }

function renderSignUpForm(res: Response, data: any = {}) {
  // Render sign up form
  res.render('sign-up/sign-up-form', {
    title: 'Sign Up',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    username: data.username || '',
    errors: data.errors || {},
  });
}

function showConfirmationPending(res: Response, data: any = {}) {
  res.render('sign-up/account-confirmation-pending', {
    title: 'Sign Up',
    name: data.name || 'No named provided',
    email: data.email || 'Not email provided',
  });
}
