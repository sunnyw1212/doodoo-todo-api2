import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';

export const convertPlaintextToHash = async (plaintext: string, salt_rounds = 14) => await bcrypt.hash(plaintext, salt_rounds);

export const isUserPasswordValid = async (user: User, password: string) => await bcrypt.compare(password, user.password_hash);

export const generateAccessToken = (length = 20) => crypto.randomBytes(length).toString('hex');
