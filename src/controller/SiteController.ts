import {
  Post, JsonController, BadRequestError, BodyParam,
} from 'routing-controllers';
import { validate } from 'class-validator';
import { validatePassword } from '../utils/validator';
import { convertPlaintextToHash, generateAccessToken } from '../utils/security';
import { User } from '../entity/User';
import { logger } from '../../logger';

@JsonController()
export class SiteController {
  /**
   * registers and creates a new User
   */
  @Post('/register')
  async register(
  @BodyParam('email_address') email_address: string,
    @BodyParam('password') password: string,
    @BodyParam('is_doer') is_doer: boolean,
    @BodyParam('assigned_doer') assigned_doer: number,
  ) {
    if (!validatePassword(password)) {
      throw new BadRequestError('Invalid password');
    }

    // hash password
    const password_hash: string = await convertPlaintextToHash(password);
    logger.info(`password_hash length${password_hash.length}`);
    // create user
    const user = new User();
    user.email_address = email_address;
    user.password_hash = password_hash;
    user.is_doer = is_doer;
    // generate access token
    user.access_token = generateAccessToken();
    // only set assigned_doer if user is not a doer themself
    if (!is_doer) {
      user.assigned_doer = assigned_doer;
    }

    const validation_results = await validate(user);
    if (validation_results.length > 0) {
      throw new BadRequestError(validation_results.toString());
    }
    return await user.save();
  }

  @Post('login')
  async login(
  @BodyParam('email_address') email_address: string,
    @BodyParam('password') password: string,
  ) {}

  // async all(request: Request, response: Response) {
  //   return User.find({ relations: ['assigned_to_user', 'created_by_user'] });
  // }

  // async one(request: Request, response: Response) {
  //   return User.findOne(request.params.id);
  // }

  // async save(request: Request, response: Response) {
  //   return User.save(request.body);
  // }

  // async remove(request: Request, response: Response) {
  //   const userToRemove: User = (await User.findOne(request.params
  //     .id as number));
  //   await User.remove(userToRemove);
  // }
}
