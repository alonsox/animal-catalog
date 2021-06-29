import { Router } from 'express';
import { authorize } from '../../security/middleware/authorization.middleware';
import { handleDeleteUser } from '../controllers/delete-user.controller';
import {
  handlePasswordReset,
  showPasswordResetForm,
} from '../controllers/pwd-reset/reset-password.controller';
import {
  handleSendPasswordResetEmail,
  showSendPwdResetEmailForm,
} from '../controllers/pwd-reset/send-pwd-reset-email.controller';
import { showMyAccountDetailsForm } from '../controllers/shared.controller';
import {
  checkAccountConfirmation,
  createNewAccount,
  showSignUpForm,
} from '../controllers/sign-up';
import { handleUpdateUser } from '../controllers/update-user.controller';
import {
  validateResetPassword,
  validateSendResetEmail,
} from '../validators/pwd_reset.validators';
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
usersRoutes
  .route(routes.delete())
  .post(authorize({ onlyOwnUser: true }), handleDeleteUser);

usersRoutes
  .route(routes.update())
  .post(
    authorize({ onlyOwnUser: true }),
    validateUpdateUser(),
    handleUpdateUser,
  );

usersRoutes
  .route(routes.getDetails())
  .get(authorize({ onlyOwnUser: true }), showMyAccountDetailsForm);

/**
 * PASSWORD RESET
 */
usersRoutes
  .route(routes.pwdReset())
  .get(showSendPwdResetEmailForm)
  .post(validateSendResetEmail(), handleSendPasswordResetEmail);

usersRoutes
  .route(routes.pwdResetConfirm())
  .get(showPasswordResetForm)
  .post(validateResetPassword(), handlePasswordReset);

/*
 * EXPORTS
 */
export { usersRoutes };

export * from './routes.config';
