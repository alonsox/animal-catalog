import { UserDto } from '../../modules/users/utils';

declare namespace Express {
  export interface Request {
    user?: UserDto;
  }
}
