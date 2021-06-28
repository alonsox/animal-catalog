import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { createUser } from '../../use-cases/create-user';
import { getErrorMessages } from '../../../shared/utils';
import { SignUpErrors } from '../../validators/user.validators';

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
  next: NextFunction,
) {
  try {
    if (req.user) {
      res.redirect('/');
      return;
    }

    // VALIDATE INPUT
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      renderSignUpForm(res, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        errors: getErrorMessages<SignUpErrors>(errors),
      });
      return;
    }

    // CREATE USER
    const newUser = await createUser(req.body);

    // Send to page of confirmation
    showConfirmationPending(res, {
      name: newUser.firstName,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
}

interface SignUpFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  errors?: SignUpErrors;
}

function renderSignUpForm(res: Response, data: SignUpFormData = {}) {
  // Render sign up form
  res.render('users/sign-up/sign-up-form', {
    title: 'Sign Up',
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    username: data.username || '',
    errors: data.errors || {},
  });
}

interface ConfirmationPendindData {
  name?: string;
  email?: string;
}

function showConfirmationPending(
  res: Response,
  data: ConfirmationPendindData = {},
) {
  res.render('users/sign-up/account-confirmation-pending', {
    title: 'Sign Up',
    name: data.name || 'No named provided',
    email: data.email || 'Not email provided',
  });
}
