import {
  Post,
  JsonController,
  BadRequestError,
  BodyParam,
  Req,
  Res,
  // ForbiddenError,
} from 'routing-controllers';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
// import * as passport from 'passport';
import { validatePassword } from '../utils/validator';
// import { convertPlaintextToHash, generateAccessToken } from '../utils/security';
// import { User } from '../entity/User';
// import { logger } from '../../logger';
// import { userService, authService } from '../service';
import { userService, authService } from '../service';
import { CustomSuccessResponse } from '../types';
// import { logger } from '../../logger';

@JsonController()
export class SiteController {
  /**
   * registers and creates a new User
   */
  @Post('/register')
  async register(
  @Req() request: Request,
    @Res() response: Response,
    @BodyParam('email_address') email_address: string,
    @BodyParam('password') password: string,
    @BodyParam('is_doer') is_doer: boolean,
    @BodyParam('assigned_doer') assigned_doer: number,
  ) {
    if (!validatePassword(password)) {
      throw new BadRequestError('Invalid password');
    }
    const user = await userService.create(email_address, password, is_doer, assigned_doer);
    const validation_results = await validate(user);
    if (validation_results.length > 0) {
      throw new BadRequestError(validation_results.toString());
    }
    const result: CustomSuccessResponse = {
      status: 'success',
      data: {
        user: user.summary(),
      },
    };
    return response.status(200).json(result);
  }

  @Post('/login')
  async login(@Req() request: Request, @Res() response: Response) {
    const auth_response = await authService.login(request, response);
    const result: CustomSuccessResponse = {
      status: 'success',
      data: {
        user: auth_response,
      },
    };
    return response.status(200).json(result);
  }

  @Post('/logout')
  logout(@Req() request: Request, @Res() response: Response) {
    authService.logout(request, response);
    const result: CustomSuccessResponse = {
      status: 'success',
      message: 'Logged out successfully',
    };
    return response.status(200).json(result);
  }
}
