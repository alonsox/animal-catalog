import { Router } from 'express';
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

const usersRoutes = Router();

usersRoutes
  .route('/sign-up')
  .get(showSignUpForm)
  .post(validateSignUp(), createNewAccount);

usersRoutes.route('/sign-up/:confirmationCode').get(checkAccountConfirmation);

usersRoutes
  .route('/my-account/update/:id')
  .post(validateUpdateUser(), handleUpdateUser);

usersRoutes.route('/my-account/:id').get(showMyAccountDetailsForm);

export { usersRoutes };

export const usersMountPoint = '/users';
