import { Document, Model } from 'mongoose';

export interface UserFields {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  confirmationCode: string;
}

export interface UserDocument extends UserFields, Document {}

export interface UserModel extends Model<UserDocument> {
  /**
   * Finds a user by email or username.
   *
   * @returns A query for searching the user.
   */
  findByLoginField(this: Model<UserDocument>, loginField: string): any;
}
