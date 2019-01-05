import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { validate } from 'class-validator';
import { validatePassword } from '../utils/validator';

import { Account } from '../entity/Account';

export class AccountController {
  async create(request: Request, response: Response, next: NextFunction) {
    console.log('fuck');
    const {
      password,
      email_address,
      is_doer,
      assigned_doer,
    }: {
    password: string;
    email_address: string;
    is_doer: boolean;
    assigned_doer: number;
    } = request.query;
    console.log(password);
    console.log(validatePassword(password));
    if (!validatePassword(password)) {
      throw new Error('Invalid password');
    }

    // hash password
    const salt_rounds = 10;
    const password_hash: string = await bcrypt.hash(password, salt_rounds);
    console.log(password_hash.length);
    // create Account
    const account = new Account();
    account.email_address = email_address;
    account.password_hash = password_hash;
    account.is_doer = is_doer;
    // only set assigned_doer if account is not a doer themself
    if (!is_doer) {
      account.assigned_doer = assigned_doer;
    }

    const validation_results = await validate(account);
    if (validation_results.length > 0) {
      throw new Error(validation_results.toString());
    }
    return await account.save();
  }

  async all(request: Request, response: Response, next: NextFunction) {
    return Account.find({ relations: ['assigned_to_account', 'created_by_account'] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return Account.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return Account.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const accountToRemove: Account = (await Account.findOne(request.params
      .id as number)) as Account;
    await Account.remove(accountToRemove);
  }
}
