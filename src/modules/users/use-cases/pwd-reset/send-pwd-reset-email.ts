import { LeanDocument } from 'mongoose';
import { appConfig } from '../../../../app.config';
import { sendEmailWithTemplate } from '../../../notifications/email';
import { capitalizeAll } from '../../../shared/utils/formatters';
import { User, UserDocument } from '../../models/user';
import { createSecurityCode } from './security-code';

export async function sendPasswordResetEmail(email: string) {
  const user = await User.findOne({ email }).lean();
  if (!user) {
    throw new Error('This email is not associated to any user');
  }

  const securityCode = await createSecurityCode(user._id.toString());

  await sendTheEmail(user, securityCode);
}

async function sendTheEmail(
  user: LeanDocument<UserDocument>,
  securityCode: string,
) {
  const appBaseLink = appConfig.appUrl;
  const pwdResetLink = `${appBaseLink}/users/pwd-reset/${user._id}/${securityCode}`;

  sendEmailWithTemplate(
    {
      to: user.email,
      subject: '[Animal Catalog] Password Reset',
    },
    'pwd-reset',
    {
      name: `${capitalizeAll(user.firstName)} ${capitalizeAll(user.lastName)}`,
      link: pwdResetLink,
    },
  );
}
