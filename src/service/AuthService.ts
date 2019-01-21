import { NotFoundError } from 'routing-controllers';
import * as passport from 'passport';
import { Request, Response } from 'express';
import { isUserPasswordValid } from '../utils/security';
import { logger } from '../../logger';
import { User } from '../entity/User';
import { UserSummary } from '../types';

// const passport_authenticate_async = promisify(passport.authenticate);

export class AuthService {
  localStrategyVerifyCB = async (
    email_address: string,
    password: string,
    done: (error: any, user?: object | boolean, options?: { message: string }) => void,
  ) => {
    try {
      logger.info('localStrategyVerifyCB');
      // find user by email
      const user = await User.findOne({ email_address });
      if (!user) {
        return done(null, false, { message: 'Invalid Email/Password combination' });
      }
      // validate password
      const isPasswordValid = await isUserPasswordValid(user, password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Invalid Email/Password combination' });
      }
      // return user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  async serializeUserCB(user, done: (error: any, id: number) => void) {
    logger.info('serializeUserCB');
    done(null, user.id);
  }

  async deserializeUserCB(id: number, done: (error: any, user?: any) => void) {
    logger.info('deserializeUserCB id: ', id);
    try {
      const user = await User.findOne(id);
      if (!user) {
        return done(new NotFoundError('User not found'));
      }
      done(null, user);
    } catch (e) {
      done(e);
    }
  }

  async login(request: Request, response: Response) {
    // result will either be error or user summary
    let result: UserSummary | Error | undefined;
    // workaround because routing-controllers doesnt like nested request and response
    await new Promise((resolve, reject) => {
      passport.authenticate('local', (err: Error, user: User, info: string) => {
        if (err) {
          result = err;
          return reject(err);
        }
        if (!user) {
          result = new NotFoundError(info);
          return reject(new NotFoundError(info));
        }
        request.logIn(user as User, (err: any) => {
          if (err) {
            result = err;
            return reject(err);
          }
          result = user.summary();
          return resolve(user.summary());
        });
      })(request, response);
    });
    return result;
  }

  logout(request: Request, response: Response) {
    return request.logout();
  }

  //   async create(
  //     email_address: string,
  //     password: string,
  //     is_doer: boolean,
  //     assigned_doer: number,
  //   ): Promise<any> {
  //     // hash password
  //     const password_hash: string = await convertPlaintextToHash(password);
  //     logger.info(`password_hash length ${password_hash.length}`);

  //     // create user
  //     const user = new this.User();
  //     user.email_address = email_address;
  //     user.password_hash = password_hash;
  //     user.is_doer = is_doer;
  //     // generate access token
  //     user.access_token = generateAccessToken();
  //     // only set assigned_doer if user is not a doer themself
  //     if (!is_doer) {
  //       user.assigned_doer = assigned_doer;
  //     }

  //     const result = await user.save();

  //     return result.summary;
  //   }
}
