import { User } from '../models/user';
import { userDocumentToDto, UserDto } from '../utils';
import { UserNotFoundError } from './user-not-found-error';

export async function getUser(
  userId: string,
): Promise<UserDto | UserNotFoundError> {
  try {
    const user = await User.findById(userId);

    if (!user || !user.isActive) {
      return new UserNotFoundError(userId);
    }

    return userDocumentToDto(user);
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
