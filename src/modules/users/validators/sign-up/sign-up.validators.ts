import { body } from 'express-validator';
import { User } from '../../models/user';

// TODO: add the following validation
// singleWord: firstName, lastName, username,password
// onlyLetters: firstName, lastName,
// onlyletters and numbers: username

/*
 * CONFIGURATION
 */
const minChars = 4;
const maxChars = 30;

const pwdMinChars = 8;
const pwdMaxChars = 30;

/*
 * ERROR MESSAGES
 */
export const firstNameErrors = {
  notExists: 'The first name must be provided',
  isEmpty: 'The first name cannot be empty',
  tooLong: `The first name must have at most ${maxChars} characters`,
};

export const lastNameErrors = {
  notExists: 'The last name must be provided',
  isEmpty: 'The last name cannot be empty',
  tooLong: `The last name must have at most ${maxChars} characters`,
};

export const usernameErrors = {
  notExists: 'The username must be provided',
  isEmpty: 'The username cannot be empty',
  badLength: `The username must be between ${minChars} and ${maxChars} characters`,
  alreadyExists: (name: string) => `The username "${name}" already exists`,
};

export const emailErrors = {
  notExists: 'The email must be provided',
  isEmpty: 'The email cannot be empty',
  isInvalid: 'The email is invalid',
  alreadyExists: (email: string) => `The email "${email}" already exists`,
};

export const passwordErrors = {
  notExists: 'The password must be provided',
  isEmpty: 'The password cannot be empty',
  badLength: `The password must be between ${pwdMinChars} and ${pwdMaxChars} characters`,
};

export const pwdConfirmationErrors = {
  notExists: 'The password confirmation must be provided',
  itDoesNotMatch: 'The passwords does not match',
};

/*
 * THE VALIDATORS
 */
export function validateSignUp() {
  return [
    body('firstName')
      .exists({ checkNull: true })
      .withMessage(firstNameErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(firstNameErrors.isEmpty)
      .isLength({ max: maxChars })
      .withMessage(firstNameErrors.tooLong)
      .customSanitizer((x: string) => x.toLowerCase()),

    body('lastName')
      .exists({ checkNull: true })
      .withMessage(lastNameErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(lastNameErrors.isEmpty)
      .isLength({ max: maxChars })
      .withMessage(lastNameErrors.tooLong)
      .customSanitizer((x: string) => x.toLowerCase()),

    body('username')
      .exists({ checkNull: true })
      .withMessage(usernameErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(usernameErrors.isEmpty)
      .isLength({ min: minChars, max: maxChars })
      .withMessage(usernameErrors.badLength)
      .bail()
      .custom(async (value: string) => {
        if (await User.exists({ username: value })) {
          throw new Error(usernameErrors.alreadyExists(value));
        }
      }),

    body('email')
      .exists({ checkNull: true })
      .withMessage(emailErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage(emailErrors.isEmpty)
      .customSanitizer((x) => x.toLowerCase())
      .isEmail({})
      .withMessage(emailErrors.isInvalid)
      .custom(async (value: string) => {
        if (await User.exists({ email: value })) {
          throw new Error(emailErrors.alreadyExists(value));
        }
      }),

    body('password')
      .exists({ checkNull: true })
      .withMessage(passwordErrors.notExists)
      .notEmpty()
      .withMessage(passwordErrors.isEmpty)
      .isLength({ min: pwdMinChars, max: pwdMaxChars })
      .withMessage(passwordErrors.badLength),

    body('pwdConfirmation')
      .exists({ checkNull: true })
      .withMessage(pwdConfirmationErrors.notExists)
      .trim()
      .notEmpty()
      .withMessage('The shit is empty')
      .custom((value: string, { req }) => {
        if (value !== req.body.password) {
          throw new Error(pwdConfirmationErrors.itDoesNotMatch);
        }

        return true;
      }),
  ];
}
