import { capitalizeFirst } from '../../shared/utils/formatters';
import { UserDocument } from '../models/user';

interface UserDtoProps {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export class UserDto {
  constructor(private props: UserDtoProps) {}

  get id() {
    return this.props.id;
  }

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get username() {
    return this.props.username;
  }

  get email() {
    return this.props.email;
  }

  get isAdmin() {
    return this.props.isAdmin;
  }
}

/** Converts a user document to a DTO */
export function toUserDto(user: UserDocument): UserDto {
  return new UserDto({
    id: user.id,
    firstName: capitalizeFirst(user.firstName),
    lastName: capitalizeFirst(user.lastName),
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
