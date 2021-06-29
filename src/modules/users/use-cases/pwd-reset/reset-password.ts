import { updateUser } from '../update-user';
import { UserNotFoundError } from '../user-not-found-error';
import { verifySecurityCode } from './security-code';

export class PasswordResetSuccess {}

export async function resetPassword(
  userId: string,
  securityCode: string,
  newPassword: string,
): Promise<PasswordResetSuccess | UserNotFoundError | Error> {
  try {
    // Check that the user exists
    const result = await verifySecurityCode(userId, securityCode);

    if (result instanceof Error) {
      return result;
    }

    // Change password
    const updateResult = await updateUser({
      userId,
      password: newPassword,
    });

    if (updateResult instanceof UserNotFoundError) {
      return updateResult;
    }

    return new PasswordResetSuccess();
  } catch (err) {
    return new Error('Unknown error while reseting the password');
  }
}
