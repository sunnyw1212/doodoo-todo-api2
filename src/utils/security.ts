import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { Account } from '../entity/Account';

export const convertPlaintextToHash = async (plaintext: string, salt_rounds = 10) => await bcrypt.hash(plaintext, salt_rounds);

export const isAccountPasswordValid = async (account: Account, password: string) => await bcrypt.compare(password, account.password_hash);

export const generateAccessToken = (length = 20) => crypto.randomBytes(length).toString('hex');
