import bcrypt from 'bcryptjs';
import { usersConfig } from '../../users.config';

export function hashPwd(pwd: string): Promise<string> {
  return bcrypt
    .genSalt(usersConfig.pwdHashSaltRounds)
    .then((salt) => bcrypt.hash(pwd, salt));
}

export function comparePwd(candidatePwd: string, hashedPwd: string) {
  return bcrypt.compare(candidatePwd, hashedPwd);
}
