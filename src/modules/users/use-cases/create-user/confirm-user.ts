import { User, UserDocument } from '../../models/user';
import { AccountConfirmationDto } from '../../dto/account.confirmation-dto';
import { checkConfirmationCode } from './confirmation-code';
import { toUserDto } from '../../dto/user-dto';

const errorMessages = {
  noConfirmationCode: 'There is no confirmation code',
  userNotExists: 'There is no user with that confirmation code',
  invalidCode: 'The confirmation code is invalid',
};

export async function confirmAccount(confirmationCode: string) {
  // TODO: Add a try catch and proper error handling

  // Check confirmation code
  if (!confirmationCode) {
    throw new Error(errorMessages.noConfirmationCode);
  }

  // Find user
  const user = await User.findOne({ confirmationCode }).exec();
  if (!user) {
    throw new Error(errorMessages.userNotExists);
  }

  // Account already active
  if (user.isActive) {
    return new AccountConfirmationDto({
      wasAlreadyActive: true,
      user: toUserDto(user),
    });
  }

  // Rejects (throws error) if not valid
  await checkConfirmationCode(user.email, confirmationCode);

  // Activate account
  activateAccount(user);

  return new AccountConfirmationDto({
    wasAlreadyActive: false,
    user: toUserDto(user),
  });
}

async function activateAccount(user: UserDocument) {
  // eslint-disable-next-line no-param-reassign
  user.isActive = true;
  await user.save();

  // Delete expires after field
  await User.findByIdAndUpdate(user.id, { $unset: { expiresAfter: 1 } });
}
