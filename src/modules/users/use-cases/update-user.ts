import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto, toUserDto } from '../dto/user-dto';
import { User } from '../models/user';
import { hashPwd } from '../shared/hash-password';
import { UserNotFoundError } from './user-not-found-error';

export async function updateUser(
  info: UpdateUserDto,
): Promise<UserDto | UserNotFoundError> {
  const { userId, ...updateFields } = info;
  try {
    const user = await User.findById(userId);

    if (!user || !user.isActive) {
      return new UserNotFoundError(userId);
    }

    // Update user info
    user.firstName = updateFields.firstName || user.firstName;
    user.lastName = updateFields.lastName || user.lastName;
    user.username = updateFields.username || user.username;
    if (updateFields.password) {
      user.password = await hashPwd(updateFields.password);
    }

    // Save changes
    return toUserDto(await user.save());
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
