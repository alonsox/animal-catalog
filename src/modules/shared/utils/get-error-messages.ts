import { Result, ValidationError } from 'express-validator';

/**
 * Transforms the object returned from `validationResult()` of express-validator
 * into an object where each key is the parameter that had an error and its
 * value is the error message.
 *
 * @note The template parameter `T` must be provided by you and is your
 * responsability that the name of the keys on the object and of express-validator
 * matches.
 *
 * @param errors The object from 'validationResult'.
 */
export function getErrorMessages<T>(errors: Result<ValidationError>): T {
  const cleanedErrors = {};
  errors.array().forEach((e) => {
    (cleanedErrors as any)[e.param] = e.msg;
  });

  return cleanedErrors as T;
}
