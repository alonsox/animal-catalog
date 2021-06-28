import { UpdateUserDto } from '../dto/edit-user.dto';
import { User } from '../models/user';
import { userDocumentToDto, UserDto } from '../utils';
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

    return userDocumentToDto(await user.save());
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
