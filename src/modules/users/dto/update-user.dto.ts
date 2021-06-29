export interface UpdateUserDto {
  userId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  /** The password raw */
  password?: string;
}
