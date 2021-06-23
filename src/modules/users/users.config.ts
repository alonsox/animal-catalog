export const usersConfig = {
  /** Salt rounds to be used when hashing the password */
  pwdHashSaltRounds: parseInt(process.env.PWD_HASH_SALT || '10', 10),

  /** Secret for the new account's security code */
  accountConfirmationSecret: process.env.ACCOUNT_CONFIRMATION_SECRET as string,

  /** Secret for the reset password's security code */
  pwdResetSecret: process.env.PWD_RESET_SECRET,

  /** Expiration time for a password reset (in seconds) */
  pwdResetExpirationTime: parseInt(
    process.env.PWD_RESET_EXP_TIME_SECONDS || '300',
    10,
  ), // Default: 5 minutes

  /** Expiration time for confirming a new account  (in seconds) */
  newAccountExpirationTime: parseInt(
    process.env.NEW_ACCOUNT_EXP_TIME_SECONDS || '300',
    10,
  ), // Default: 5 minutes
};
