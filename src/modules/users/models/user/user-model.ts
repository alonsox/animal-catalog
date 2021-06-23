import { model, Model, Schema } from 'mongoose';
import { usersConfig } from '../../users.config';
import { userConstants } from './user-constants';
import { UserDocument, UserModel } from './user-types';

const userSchema = new Schema<UserDocument, UserModel>({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean },
  isActive: { type: Boolean },
  confirmationCode: { type: String },
  expiresAfter: {
    type: Date,
    default: Date.now,
    expires: usersConfig.newAccountExpirationTime,
  },
});

userSchema.statics.findByLoginField = function findByLoginField(
  this: Model<UserDocument>,
  loginField: string,
) {
  return this.findOne({
    $or: [{ email: loginField }, { username: loginField }],
  });
};

export const User = model<UserDocument, UserModel>(
  userConstants.modelName,
  userSchema,
  userConstants.collectionName,
);
