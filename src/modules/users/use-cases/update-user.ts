import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto, toUserDto } from '../dto/user-dto';
import { User } from '../models/user';
import { UserNotFoundError } from './user-not-found-error';

export async function updateUser(
  info: UpdateUserDto,
): Promise<UserDto | UserNotFoundError> {
  const { userId, ...data } = info;
  try {
    const user = await User.findById(userId);

    if (!user || !user.isActive) {
      return new UserNotFoundError(userId);
    }

    user.set(data);

    return toUserDto(await user.save());
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
