import { body } from 'express-validator';
import { User } from '../models/user';
import { comparePwd } from '../shared/hash-password';

// TODO: add the following validation
// singleWord: firstName, lastName, username,password
// onlyLetters: firstName, lastName,
// onlyletters and numbers: username

export interface SignUpErrors {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export interface UpdateErrors {
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly password: string;
}

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

export const oldPasswordErrors = {
  notExists: 'The old password must be provided',
  isIncorrect: 'The old password is not valid',
};

/*
 * THE VALIDATORS
 */
const baseValidators = [
  // FIRST NAME
  body('firstName')
    .exists({ checkNull: true })
    .withMessage(firstNameErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(firstNameErrors.isEmpty)
    .isLength({ max: maxChars })
    .withMessage(firstNameErrors.tooLong)
    .toLowerCase(),

  // LAST NAME
  body('lastName')
    .exists({ checkNull: true })
    .withMessage(lastNameErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(lastNameErrors.isEmpty)
    .isLength({ max: maxChars })
    .withMessage(lastNameErrors.tooLong)
    .toLowerCase(),

  // USERNAME
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

  // EMAIL
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

  // PASSWORD
  body('password')
    .exists({ checkNull: true })
    .withMessage(passwordErrors.notExists)
    .notEmpty()
    .withMessage(passwordErrors.isEmpty)
    .isLength({ min: pwdMinChars, max: pwdMaxChars })
    .withMessage(passwordErrors.badLength),

  // PASSWORD CONFIRMATION
  body('pwdConfirmation')
    .exists({ checkNull: true })
    .withMessage(pwdConfirmationErrors.notExists)
    .trim()
    .notEmpty()
    .withMessage(pwdConfirmationErrors.notExists)
    .custom((value: string, { req }) => {
      if (value !== req.body.password) {
        throw new Error(pwdConfirmationErrors.itDoesNotMatch);
      }

      return true;
    }),
];

export function validateSignUp() {
  return [
    ...baseValidators,
    // USERNAME
    body('username').custom(async (value: string) => {
      if (await User.exists({ username: value })) {
        throw new Error(usernameErrors.alreadyExists(value));
      }
    }),

    // EMAIL
    body('email').custom(async (value: string) => {
      if (await User.exists({ email: value })) {
        throw new Error(emailErrors.alreadyExists(value));
      }
    }),
  ];
}

export function validateUpdate() {
  return [
    ...baseValidators,
    // USERNAME
    body('username').custom(async (value: string, { req }) => {
      const existingUser = await User.findOne({ username: value }).lean();

      if (!existingUser) {
        return;
      }

      const userBeingUpdatedId = req.params?.id;
      if (userBeingUpdatedId !== existingUser._id.toString()) {
        throw new Error(usernameErrors.alreadyExists(value));
      }
    }),

    // PASSWORD
    body('oldPassword').custom(async (value: string, { req }) => {
      const userBeingUpdatedId = req.params?.id;

      try {
        const existingUser = await User.findOne({ username: value });

        if (!existingUser) {
          throw new Error(oldPasswordErrors.isIncorrect);
        }

        if (userBeingUpdatedId !== existingUser._id.toString()) {
          throw new Error(oldPasswordErrors.isIncorrect);
        }

        if (!(await comparePwd(value, existingUser.password))) {
          throw new Error(oldPasswordErrors.isIncorrect);
        }
      } catch (err: any) {
        throw new Error(oldPasswordErrors.isIncorrect);
      }
    }),
  ];
}
