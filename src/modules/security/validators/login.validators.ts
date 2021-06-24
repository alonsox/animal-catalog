const { body } = require('express-validator');

/*
 * ERROR MESSAGES
 */
export const loginFieldErrors = {
  notExist: 'The username or email must be provided',
  isEmpty: 'The username or email cannot be empty',
};

export const passwordErrors = {
  notExist: 'The password must be provided',
  isEmpty: 'The password cannot be empty',
};

/*
 * VALIDATORS
 */
export function validateLogin() {
  return [
    body('loginField')
      .exists({ checkNull: true })
      .withMessage(loginFieldErrors.notExist)
      .trim()
      .notEmpty()
      .withMessage(loginFieldErrors.isEmpty),

    body('password')
      .exists({ checkNull: true })
      .withMessage(passwordErrors.notExist)
      .notEmpty()
      .withMessage(passwordErrors.isEmpty),
  ];
}
