import { convertPlaintextToHash, generateAccessToken } from '../utils/security';
import { logger } from '../../logger';
import { User } from '../entity/User';

export class UserService {
  async create(
    email_address: string,
    password: string,
    is_doer: boolean,
    assigned_doer: number,
  ): Promise<any> {
    // hash password
    const password_hash: string = await convertPlaintextToHash(password);
    logger.info(`password_hash length ${password_hash.length}`);

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

    const result = await user.save();

    return result.summary;
  }
}
