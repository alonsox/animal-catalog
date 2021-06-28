import { Router } from 'express';
import { handleDeleteUser } from '../controllers/delete-user.controller';
import { showMyAccountDetailsForm } from '../controllers/shared.controller';
import {
  checkAccountConfirmation,
  createNewAccount,
  showSignUpForm,
} from '../controllers/sign-up';
import { handleUpdateUser } from '../controllers/update-user.controller';
import {
  validateSignUp,
  validateUpdateUser,
} from '../validators/user.validators';
import { routes } from './routes.config';

const usersRoutes = Router();

/**
 * SIGN UP
 */
usersRoutes
  .route(routes.signUp())
  .get(showSignUpForm)
  .post(validateSignUp(), createNewAccount);

usersRoutes.route(routes.confirmAccount()).get(checkAccountConfirmation);

/**
 * ACCOUNT MANAGEMENT
 */
usersRoutes.route(routes.delete()).post(handleDeleteUser);

usersRoutes.route(routes.update()).post(validateUpdateUser(), handleUpdateUser);

usersRoutes.route(routes.getDetails()).get(showMyAccountDetailsForm);

/*
 * EXPORTS
 */
export { usersRoutes };

export * from './routes.config';
