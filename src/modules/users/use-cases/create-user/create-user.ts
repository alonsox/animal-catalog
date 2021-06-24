import { appConfig } from '../../../../app.config';
import { sendEmailWithTemplate } from '../../../notifications/email';
import { CreateUserDto } from './create-user-dto';
import { userDocumentToDto, UserDto } from './user-dto';
import { User, UserDocument } from '../../models/user';
import { hashPwd } from './hash-password';
import { createSecurityCode } from './confirmation-code';

interface NewAccountEmailData {
  /** The name of the user to personalize the email */
  name: string;

  /** The account confirmation link */
  link: string;
}

export async function createUser(infoUsuario: CreateUserDto): Promise<UserDto> {
  // Create and save user
  const newUser = await createUserDocument(infoUsuario);
  await newUser.save();

  // Send email
  sendConfirmationEmail(newUser);

  return userDocumentToDto(newUser);
}

async function createUserDocument(
  userInfo: CreateUserDto,
): Promise<UserDocument> {
  const hashedPwd = await hashPwd(userInfo.password);
  const confirmationCode = await createSecurityCode(userInfo);

  return new User({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    username: userInfo.username,
    email: userInfo.email,
    password: hashedPwd,
    // Set by us
    isAdmin: false,
    isActive: false,
    confirmationCode,
  });
}

async function sendConfirmationEmail(user: UserDocument) {
  const { urlApp } = appConfig;
  const confirmationLink = `${urlApp}/users/sign-up/${user.confirmationCode}`;

  await sendEmailWithTemplate<NewAccountEmailData>(
    {
      to: user.email,
      subject: '[Animal Catalog] Account Confirmation',
    },
    'account-confirmation',
    {
      name: user.firstName,
      link: confirmationLink,
    },
  );
}
