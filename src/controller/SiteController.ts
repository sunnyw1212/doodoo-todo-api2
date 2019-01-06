import {
  Post, JsonController, BadRequestError, BodyParam,
} from 'routing-controllers';
import { validate } from 'class-validator';
import { validatePassword } from '../utils/validator';
import { convertPlaintextToHash, generateAccessToken } from '../utils/security';
import { Account } from '../entity/Account';

@JsonController()
export class SiteController {
  /**
   * registers and creates a new Account
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
    console.log(password_hash.length);
    // create Account
    const account = new Account();
    account.email_address = email_address;
    account.password_hash = password_hash;
    account.is_doer = is_doer;
    // generate access token
    account.access_token = generateAccessToken();
    // only set assigned_doer if account is not a doer themself
    if (!is_doer) {
      account.assigned_doer = assigned_doer;
    }

    const validation_results = await validate(account);
    if (validation_results.length > 0) {
      throw new BadRequestError(validation_results.toString());
    }
    return await account.save();
  }

  @Post('login')
  async login(
  @BodyParam('email_address') email_address: string,
    @BodyParam('password') password: string,
  ) {}

  // async all(request: Request, response: Response, next: NextFunction) {
  //   return Account.find({ relations: ['assigned_to_account', 'created_by_account'] });
  // }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   return Account.findOne(request.params.id);
  // }

  // async save(request: Request, response: Response, next: NextFunction) {
  //   return Account.save(request.body);
  // }

  // async remove(request: Request, response: Response, next: NextFunction) {
  //   const accountToRemove: Account = (await Account.findOne(request.params
  //     .id as number)) as Account;
  //   await Account.remove(accountToRemove);
  // }
}
