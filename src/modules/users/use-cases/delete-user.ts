import { User } from '../models/user';
import { userDocumentToDto, UserDto } from '../utils';
import { UserNotFoundError } from './user-not-found-error';

export async function deleteUser(
  userId: string,
): Promise<UserDto | UserNotFoundError> {
  try {
    const user = await User.findById(userId);

    if (!user || !user.isActive) {
      return new UserNotFoundError(userId);
    }

    return userDocumentToDto(await user.remove());
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
