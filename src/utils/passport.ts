import { NotFoundError } from 'routing-controllers';
import { User } from '../entity/User';
import { isUserPasswordValid } from './security';

export const localStrategyVerifyCB = async (
  email_address: string,
  password: string,
  done: (error: any, user?: object | boolean, options?: { message: string }) => void,
) => {
  try {
    const user = await User.findOne({ email_address });
    if (!user) {
      return done(null, false, { message: 'Invalid Email/Password combination' });
    }
    const isPasswordValid = isUserPasswordValid(user, password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid Email/Password combination' });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const serializeUserCB = (user: User, done: (error: any, id: number) => void) => {
  done(null, user.id);
};

export const deserializeUserCB = async (id: number, done: (error: any, user?: User) => void) => {
  try {
    const user = await User.findOne(id);
    if (!user) {
      return done(new NotFoundError('User not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
};
