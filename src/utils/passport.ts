import { NotFoundError } from 'routing-controllers';
import { Account } from '../entity/Account';
import { isAccountPasswordValid } from './security';

export const localStrategyVerifyCB = async (
  email_address: string,
  password: string,
  done: (error: any, account?: object | boolean, options?: { message: string }) => void,
) => {
  try {
    const account = await Account.findOne({ email_address });
    if (!account) {
      return done(null, false, { message: 'Invalid Email/Password combination' });
    }
    const isPasswordValid = isAccountPasswordValid(account, password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Invalid Email/Password combination' });
    }
    return done(null, account);
  } catch (error) {
    return done(error);
  }
};

export const serializeUserCB = (account: Account, done: (error: any, id: number) => void) => {
  done(null, account.id);
};

export const deserializeUserCB = async (
  id: number,
  done: (error: any, account?: Account) => void,
) => {
  try {
    const account = await Account.findOne(id);
    if (!account) {
      return done(new NotFoundError('Account not found'));
    }
    done(null, account);
  } catch (e) {
    done(e);
  }
};
