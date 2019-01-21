import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';
import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';
import { User } from '../entity/User';
import { logger } from '../../logger';

export class LocalAuthorization implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): Promise<passport.Authenticator> {
    return passport.authenticate('local', (err: Error, user: User, info: string) => {
      if (err || !user) {
        logger.info('Unauthorized access');
        logger.info(info);
        return next(new UnauthorizedError(info));
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}
