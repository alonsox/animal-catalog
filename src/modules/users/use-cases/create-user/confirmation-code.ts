import jwt from 'jsonwebtoken';
import { usersConfig } from '../../users.config';

/*
 * CONFIRMATION CODE SETTINGS
 */
const { accountConfirmationSecret: secret } = usersConfig;

const options: jwt.SignOptions = {
  expiresIn: usersConfig.newAccountExpirationTime,
};

export interface ConfirmationCodePayload {
  email: string;
}

/**
 * ERROR MESSAGES
 */
const errorMessages = {
  /** There was an error with JWT while creating the confirmation code */
  errorOnCreation: 'There was an error while creating the confirmation code',

  /** No error by JWT, but the token was not created */
  noCodeCreated: 'The confirmation code could not be created',

  /** Error by JWT when decoding the token */
  errorOnDecoding: 'There was an error while checking the confirmation code',

  /** There was no error by JWT, but the token was not decoded */
  noTokenDecoded: 'The confirmation code does not exist',

  /** Is a valid JWT, but it does not belong to the user. */
  invalidConfirmationCode: 'The confirmation code is invalid',
};

/**
 * Creates a confirmation code for a new account.
 *
 * Rejects with an `Error`.
 */
export function createSecurityCode(
  payload: ConfirmationCodePayload,
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(new Error(errorMessages.errorOnCreation));
      }

      if (!token) {
        reject(new Error(errorMessages.noCodeCreated));
      } else {
        resolve(token);
      }
    });
  });
}

/**
 * Checks that the confirmation code is valid.
 *
 * It rejects with an `Error`.
 */
export function checkConfirmationCode(
  userEmail: string,
  confirmationCode: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    jwt.verify(confirmationCode, secret, (err, decodedToken) => {
      if (err) {
        reject(new Error(errorMessages.errorOnDecoding));
      }

      if (!decodedToken) {
        reject(new Error(errorMessages.noTokenDecoded));
      } else if (decodedToken.email !== userEmail) {
        reject(new Error(errorMessages.invalidConfirmationCode));
      }

      resolve();
    });
  });
}
