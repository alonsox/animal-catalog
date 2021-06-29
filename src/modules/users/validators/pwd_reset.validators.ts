import { body } from 'express-validator';
import { User } from '../models/user';

const minPwdChars = 8;
const maxPwdChars = 30;

const emailErrors = {
  notExists: 'The email must be provided',
  isEmpty: 'The email cannot be  empty',
  isInvalid: 'The email is not valid',
  doesNotBelongToAUser: 'This email is not associated to any user',
};

const passwordErrors = {
  notExists: 'The password must be provided',
  isEmpty: 'The password cannot be empty',
  badLength: `The password must be between ${minPwdChars} and ${maxPwdChars} characters`,
};

const pwdConfirmationErrors = {
  notExists: 'The password confirmation must be provided',
  itDoesNotMatch: 'The passwords does not match',
};

export function validateSendResetEmail() {
  return [
    body('email')
      .exists({ checkNull: true })
      .withMessage(emailErrors.notExists)
      .bail()
      .trim()
      .notEmpty()
      .withMessage(emailErrors.isEmpty)
      .bail()
      .isEmail()
      .withMessage(emailErrors.isInvalid)
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value }).exec();
        if (!user) {
          throw new Error(emailErrors.doesNotBelongToAUser);
        }
      }),
  ];
}

export function validateResetPassword() {
  return [
    // PASSWORD
    body('newPassword')
      .exists({ checkNull: true })
      .withMessage(passwordErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(passwordErrors.isEmpty)
      .isLength({ min: minPwdChars, max: maxPwdChars })
      .withMessage(passwordErrors.badLength),

    // PASSWORD CONFIRMATION
    body('newPwdConfirmation')
      .exists({ checkNull: true })
      .withMessage(pwdConfirmationErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(pwdConfirmationErrors.notExists)
      .custom((value: string, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error(pwdConfirmationErrors.itDoesNotMatch);
        }

        return true;
      }),
  ];
}
