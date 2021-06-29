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

    const newPassword = updateFields.password
      ? await hashPwd(updateFields.password)
      : user.password;

    // Update user info
    const userUpdated = await User.findByIdAndUpdate(
      userId,
      {
        firstName: updateFields.firstName || user.firstName,
        lastName: updateFields.lastName || user.lastName,
        username: updateFields.username || user.username,
        password: newPassword,
      },
      {
        new: true,
      },
    );

    if (!userUpdated) {
      return new UserNotFoundError(userId);
    }

    return toUserDto(userUpdated);
  } catch (err: any) {
    return new UserNotFoundError(userId);
  }
}
