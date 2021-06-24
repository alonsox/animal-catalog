import { UserDto } from '../../utils';

interface AccountConfirmationDtoProps {
  /** `true` if the user had already confirmed his/her account */
  wasAlreadyActive: boolean;

  /** The information about the user */
  user: UserDto;
}

export class AccountConfirmationDto {
  constructor(private props: AccountConfirmationDtoProps) {}

  get wasAlreadyActive() {
    return this.props.wasAlreadyActive;
  }

  get user() {
    return this.props.user;
  }
}
