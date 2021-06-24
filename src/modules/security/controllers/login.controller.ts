import passport from 'passport';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { LoginErrors } from '../validators';
import { getErrorMessages } from '../../shared/utils';

export function showLoginForm(req: Request, res: Response) {
  if (req.user) {
    res.redirect('/');
    return;
  }

  renderLoginForm(res);
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user) {
    res.redirect('/');
    return;
  }

  const { loginField } = req.body;

  // VALIDATE USERNAME AND PASSWORD
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    renderLoginForm(res, {
      loginField,
      errors: getErrorMessages(errors),
    });
    return;
  }

  // LOGIN
  // Note: The callback is the 'done' function of the Strategy set up
  passport.authenticate('local', (authError, user, info) => {
    // There was an error with passport
    if (authError) {
      next(authError);
      return;
    }

    // User does not exists or password is incorrect
    if (!user) {
      renderLoginForm(res, {
        loginField,
        errorMsg: info.message,
      });
      return;
    }

    // OK, log in
    req.logIn(user, (loginError) => {
      if (loginError) {
        next(loginError);
        return;
      }

      // Set the current user
      res.locals.currentUser = req.user;
      res.redirect('/');
    });
  })(req, res, next);
}

interface LoginFormData {
  loginField?: string;
  errorMsg?: string;
  errors?: LoginErrors;
}

function renderLoginForm(res: Response, data: LoginFormData = {}) {
  res.render('auth/log-in-form', {
    title: 'Log In',
    loginField: data.loginField || '',
    errorMsg: data.errorMsg || '',
    errors: data.errors || {},
  });
}
