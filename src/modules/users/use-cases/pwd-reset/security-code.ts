import jwt from 'jsonwebtoken';
import { usersConfig } from '../../users.config';

export class SecurityCodeIsValid {}

/**
 * Creates the security code for a password reset.
 */
export function createSecurityCode(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { userId },
      usersConfig.pwdResetSecret,
      {
        expiresIn: usersConfig.pwdResetExpirationTime,
      },
      (err, signedToken) => {
        if (err) {
          reject(err);
          return;
        }

        if (!signedToken) {
          reject(new Error('Could not create the signed token'));
          return;
        }

        resolve(signedToken);
      },
    );
  });
}

/**
 * The security code will be valid only if the promise resolves, in all other
 * cases the promise will reject with an `Error`.
 */
export async function verifySecurityCode(
  userId: string,
  securityCode: string,
): Promise<SecurityCodeIsValid | Error> {
  return new Promise((resolve) => {
    jwt.verify(
      securityCode,
      usersConfig.pwdResetSecret,
      (err, decodedToken) => {
        if (err) {
          resolve(new Error('There was an error while decoding the token'));
          return;
        }

        if (!decodedToken) {
          resolve(new Error('TA token could not be obtained'));
          return;
        }

        if (decodedToken.userId !== userId) {
          resolve(new Error('The token is invalid'));
          return;
        }

        // ALL OK
        resolve(new SecurityCodeIsValid());
      },
    );
  });
}
