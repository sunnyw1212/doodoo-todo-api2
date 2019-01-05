import { Validator } from 'class-validator';

export const validatePassword = (password: string): boolean => {
  const validator: Validator = new Validator();
  return validator.minLength(password, 8);
};

export const validateEmailAddress = (email_address: string): boolean => {
  const validator: Validator = new Validator();
  return validator.isNotEmpty(email_address) && validator.isEmail(email_address);
};
