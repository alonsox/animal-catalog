import { Router } from 'express';
import {
  checkAccountConfirmation,
  createNewAccount,
  showSignUpForm,
} from '../controllers/sign-up';
import { validateSignUp } from '../validators/sign-up';

const usersRoutes = Router();

usersRoutes
  .route('/sign-up')
  .get(showSignUpForm)
  .post(validateSignUp(), createNewAccount);

usersRoutes.route('/sign-up/:confirmationCode').get(checkAccountConfirmation);

export { usersRoutes };
