import { UserDto } from '../../modules/users/dto/user-dto';

declare namespace Express {
  export interface Request {
    user?: UserDto;
  }
}
