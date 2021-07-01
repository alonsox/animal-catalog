import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import {
  IStrategyOptions,
  IVerifyOptions,
  Strategy as LocalStrategy,
} from 'passport-local';
import { securityConfig } from '../security.config';
import { User, UserDocument } from '../../users/models/user';
import { UnknownError } from '../../shared/errors';
import { UserDto, toUserDto } from '../../users/dto/user-dto';
import { comparePwd } from '../../users/shared/hash-password';
import { dbConfig } from '../../../db';

/** Type for the done function of passport */
export type DoneFn = (
  error: any,
  user?: UserDto,
  options?: IVerifyOptions,
) => void;

/** The names to be used for the login */
const localStrategyConfig: IStrategyOptions = {
  usernameField: 'loginField',
  passwordField: 'password',
};

export const setUpAuthentication = () => {
  // SET UP PASSPORT STRATEGY
  passport.use(new LocalStrategy(localStrategyConfig, authenticateUser));

  // SET UP USER SERIALIZATION AND DESEREALIZATION
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done) => {
    User.findById(id, (err: any, user: UserDocument) => {
      done(err, toUserDto(user));
    });
  });

  // RETURN MIDDLEWARE FOR THE APP
  // Note: express-session is used by passport on the back
  return [
    session({
      secret: securityConfig.authSecret,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: dbConfig.uri,
        ttl: 14 * 24 * 60 * 60,
      }),
    }),
    passport.initialize(),
    passport.session(),
  ];
};

/** The callback to be used by passport to authenticate a user */
async function authenticateUser(
  loginField: string,
  password: string,
  done: DoneFn,
) {
  try {
    const user = await User.findByLoginField(loginField);

    // Check that the user exists and is active
    if (!user || !user.isActive) {
      return done(null, undefined, {
        message: 'Bad username (or email) and password',
      });
    }

    // Compare passwords
    const passwordsMatch = await comparePwd(password, user.password);
    if (!passwordsMatch) {
      return done(null, undefined, {
        message: 'Bad username (or email) and password',
      });
    }

    // All OK
    return done(null, toUserDto(user));
  } catch (err) {
    return done(new UnknownError('authentication error', err));
  }
}
