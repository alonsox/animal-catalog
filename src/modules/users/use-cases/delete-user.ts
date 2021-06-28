import { UserDto, toUserDto } from '../dto/user-dto';
import { User } from '../models/user';
import { UserNotFoundError } from './user-not-found-error';

export async function deleteUser(
  userId: string,
): Promise<UserDto | UserNotFoundError> {
  try {
    const user = await User.findById(userId);

    if (!user || !user.isActive) {
      return new UserNotFoundError(userId);
    }

    return toUserDto(await user.remove());
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
